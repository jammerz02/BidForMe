var Auction = artifacts.require("./Auction.sol");

contract("Auction", function(accounts) {
    var auctionInstance;

    it("initializes with two items", function(){
        return Auction.deployed().then(function(instance){
            return instance.itemsCount();
        }).then(function(count) {
            assert.equal(count,2)
        });
    });

    it("it initializes the candidate with the correct values", function(){
        return Auction.deployed().then(function(instance) {
            auctionInstance = instance;

            return auctionInstance.items(1);
        }).then(function(item) {
            assert.equal(item[0],1, "contains the correct id");
            assert.equal(item[1],"Vintage Watch","contains the correct name");
            assert.equal(item[2],"0","contains the correct bid value");
            assert.equal(item[3],"2000","contains the correct starting bid value");

            return auctionInstance.items(2);
        }).then(function(item) {
            assert.equal(item[0],2, "contains the correct id");
            assert.equal(item[1],"Vincent Van Gogh - The Starry Night","contains the correct name");
            assert.equal(item[2],"0","contains the correct bid value");
            assert.equal(item[3],"50000","contains the correct starting bid value");
        });
    });

    it("allows a bidder to cast a bid", function() {
        return Auction.deployed().then(function(instance) {
            auctionInstance = instance;
          itemId = 1;
          return auctionInstance.bid(itemId, { from: accounts[0] });
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "bidEvent", "the event type is correct");
          assert.equal(receipt.logs[0].args._itemId.toNumber(), itemId, "the item id is correct");
          return auctionInstance.bidders(accounts[0]);
        }).then(function(bid) {
          assert(bid, "the bidder has done bidding");
          return auctionInstance.items(itemId);
        }).then(function(item) {
          var bidValue = item[2];
          assert.equal(bidValue, 1, "increments the candidate's vote count");
        })
    });

    it("throws an exception for invalid items", function() {
        return Auction.deployed().then(function(instance) {
            auctionInstance = instance;
          return auctionInstance.bid(99, { from: accounts[1] })
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return auctionInstance.items(1);
        }).then(function(item1) {
          var bidValue = item1[2];
          assert.equal(bidValue, 1, "item 1 did not receive any bid value");
          return auctionInstance.items(2);
        }).then(function(item2) {
          var bidValue = item2[2];
          assert.equal(bidValue, 0, "item 2 did not receive any bid value");
        });
    });

    it("throws an exception for double bid", function() {
        return Auction.deployed().then(function(instance) {
          auctionInstance = instance;
          itemId = 2;
          auctionInstance.bid(itemId, { from: accounts[1] });
          return auctionInstance.items(itemId);
        }).then(function(item) {
          var bidValue = item[2];
          assert.equal(bidValue, 1, "accepts first bidding");
          // Try to vote again
          return auctionInstance.bid(itemId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return auctionInstance.items(1);
        }).then(function(item1) {
          var bidValue = item1[2];
          assert.equal(bidValue, 1, "item 1 did not receive any bid value");
          return auctionInstance.items(2);
        }).then(function(item2) {
          var bidValue = item2[2];
          assert.equal(bidValue, 1, "item 2 did not receive any bid value");
        });
    });
});
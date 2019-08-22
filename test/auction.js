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
            assert.equal(item[1],0x91ebdAE4575F14d2B7d1097BB7932A252986ef86,"contains the correct item owner")
            assert.equal(item[2],"Vintage Watch","contains the correct name");
            assert.equal(item[3],"0","contains the correct bid value");
            assert.equal(item[4],"200","contains the correct starting bid value");
            assert.equal(item[5],0x0,"contains the correct starting bidder address");
            assert.equal(item[6],false,"bid has not yet ended");
            assert.equal(item[7],0,"contains the correct starting bid value in wei");

            return auctionInstance.items(2);
        }).then(function(item) {
          assert.equal(item[0],2, "contains the correct id");
          assert.equal(item[1],0x91ebdAE4575F14d2B7d1097BB7932A252986ef86,"contains the correct item owner")
          assert.equal(item[2],"Vincent Van Gogh - The Starry Night","contains the correct name");
          assert.equal(item[3],"0","contains the correct bid value");
          assert.equal(item[4],"500","contains the correct starting bid value");
          assert.equal(item[5],0x0,"contains the correct starting bidder address");
          assert.equal(item[6],false,"bid has not yet ended");
          assert.equal(item[7],0,"contains the correct starting bid value in wei");
        });
    });

    it("allows a bidder to cast a bid", function() {
        return Auction.deployed().then(function(instance) {
            auctionInstance = instance;
          itemId = 1;
          return auctionInstance.bid(itemId,300 , { from: accounts[2], value: web3.utils.toWei("0.96","ether") });
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "bidEvent", "the event type is correct");
          assert.equal(receipt.logs[0].args.itemId.toNumber(), itemId, "the item id is correct");
          assert.equal(receipt.logs[0].args.bidder, accounts[2], "the bidder address is correct");
          return auctionInstance.items(itemId);
        })
        .then(function(bid) {
          assert.equal(bid[5],accounts[2], "the bidder has done bidding");
          return auctionInstance.items(itemId);
        }).then(function(item) {
          var bidValue = item[3];
          assert.equal(bidValue,300, "updates the bidder's bid");
        })
    });

    it("throws an exception for invalid items", function() {
        return Auction.deployed().then(function(instance) {
            auctionInstance = instance;
          return auctionInstance.bid(99,300, { from: accounts[1], value: web3.utils.toWei("0.96","ether")  })
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return auctionInstance.items(1);
        }).then(function(item1) {
          var bidValue = item1[3].toNumber();
          assert.equal(bidValue, 300, "item 1 did not receive any bid value");
          return auctionInstance.items(2);
        }).then(function(item2) {
          var bidValue = item2[3].toNumber();
          assert.equal(bidValue, 0, "item 2 did not receive any bid value");
        });
    });

    it("throws an exception for double bid", function() {
        return Auction.deployed().then(function(instance) {
          auctionInstance = instance;
          itemId = 2;
          auctionInstance.bid(itemId, 1000, { from: accounts[1], value: web3.utils.toWei("3.2","ether") });
          return auctionInstance.items(itemId);
        }).then(function(item) {
          var bidValue = item[3];
          assert.equal(bidValue, 1000, "accepts first bidding");
          return auctionInstance.bid(itemId, 1500, { from: accounts[1], value: web3.utils.toWei("4.8","ether") });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return auctionInstance.items(1);
        }).then(function(item1) {
          var bidValue = item1[3];
          assert.equal(bidValue, 300, "item 1 did not receive any bid value");
          return auctionInstance.items(2);
        }).then(function(item2) {
          var bidValue = item2[3];
          assert.equal(bidValue, 1000, "item 2 did not receive any bid value");
        });
    });

    it("throws an exception for bid simulation", function() {
      return Auction.deployed().then(function(instance) {
        auctionInstance = instance;
        itemId = 1;
        auctionInstance.bid(itemId, 3000, { from: accounts[1], value: web3.utils.toWei("9.6","ether") });
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return auctionInstance.bid(itemId, 5000, { from: accounts[2], value: web3.utils.toWei("16","ether") });
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return auctionInstance.bid(2, 10000, { from: accounts[1], value: web3.utils.toWei("32","ether") });
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return auctionInstance.bid(2, 15000, { from: accounts[2], value: web3.utils.toWei("48","ether") });
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return auctionInstance.auctionEnd(1, { from: accounts[0] });
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return auctionInstance.auctionEnd(2, { from: accounts[0] });
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      })
    });
});
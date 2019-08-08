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
});
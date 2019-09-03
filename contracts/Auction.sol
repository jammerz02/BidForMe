pragma solidity >=0.4.0 <0.6.0;

contract Auction {

    struct Item {
        uint id;
        address payable ItemOwner;
        uint itemsOwned;
        string name;
        uint bidValueDollar;
        uint bidValueStarting;
        address payable highestBidder;
        bool ended;
        uint bidValueWei;
    }

    // Store accounts that have bids
    mapping(address => uint) itemOwned;
    mapping(address => uint) pendingReturns;
    mapping(uint => Item) public items;

    uint public itemsCount;
    uint public highestBid;
    address payable lastBidder;

    // bid event
    event bidEvent (
        uint indexed itemId,
        address bidder,
        uint bidAmountDollar,
        uint bidAmountWei
    );

    event auctionEnded (
        address winner,
        uint amount
    );

    constructor() public {
    }

    function addItem(string memory _name, uint _bidStarting) public returns (bool) {
        address payable itemOwner = msg.sender;
        itemOwned[msg.sender] += 1;
        address payable highestBidder = address(0x0);
        itemsCount++;
        items[itemsCount] = Item(itemsCount, itemOwner, itemOwned[msg.sender], _name, 0, _bidStarting, highestBidder, false, 0);

        return true;
    }

    function updateItem(uint _ItemId, string memory _name, uint _bidStarting) public returns (bool) {
        // require a valid item id
        require(_ItemId > 0 && _ItemId <= itemsCount,"selected item is invalid");
        // require Item owner
        require(msg.sender == items[_ItemId].ItemOwner,"You are not the owner of this auction.");

        items[_ItemId].name = _name;
        items[_ItemId].bidValueStarting = _bidStarting;

        return true;
    }

    function removeItem(uint index) public returns (bool) {
        if (index <= itemsCount) {
            for (uint i = index; i <= itemsCount; i++) {
                items[i].id = items[i+1].id - 1;
                items[i].ItemOwner = items[i+1].ItemOwner;
                items[i].itemsOwned = items[i+1].itemsOwned - 1;
                items[i].name = items[i+1].name;
                items[i].bidValueStarting = items[i+1].bidValueStarting;
            }
            itemOwned[msg.sender] -= 1;
            itemsCount--;

            return true;
        }
    }

    function bid (uint _ItemId, uint _bidAmount) public payable returns (bool) {
        // require first time bidder address - error if not
        require(msg.sender != items[_ItemId].highestBidder,"error bidder have already bid");

        // require a valid item id
        require(_ItemId > 0 && _ItemId <= itemsCount,"selected item is invalid");

        // require bid amount should be greater than the previous bid amount
        require(_bidAmount > items[_ItemId].bidValueDollar, "Bid value does not exceed the highest bid.");

        // require bidding should still be ongoing
        require(!items[_ItemId].ended,"Auction already ended.");

        //previous bidder
        lastBidder = items[_ItemId].highestBidder;

        if (highestBid != 0) { // bid value should not be 0 to be valid
            pendingReturns[lastBidder] += highestBid;
        }
        // record the bidder address
        items[_ItemId].highestBidder = msg.sender;
        // store highest bid
        highestBid = msg.value;
        // record the highest bid in ether
        items[_ItemId].bidValueWei = msg.value;
        // update item bid value
        items[_ItemId].bidValueDollar = _bidAmount;

        // trigger bidding event
        emit bidEvent(_ItemId, msg.sender, _bidAmount, msg.value);

        return true;
    }

    function withdraw() public payable returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
            if (!msg.sender.send(amount)) {
                // No need to call throw here, just reset the amount owing
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function withdrawAmount() public view returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if(amount > 0) {
            return true;
        } else {
            return false;
        }
    }

    function auctionEnd (uint _ItemId) public payable returns (bool) {
        // require Item auction is not yet ended
        require(!items[_ItemId].ended,"You already ended this auction.");

        // require a valid item id
        require(_ItemId > 0 && _ItemId <= itemsCount,"selected item is invalid");

        // require Item owner
        require(msg.sender == items[_ItemId].ItemOwner,"You are not the owner of this auction.");

        // require bid value is not 0
        require(items[_ItemId].bidValueDollar != 0,"This Auction doesn't have any bids.");

        // record Item auction has ended
        items[_ItemId].ended = true;

        // store highest bid in ether
        highestBid = items[_ItemId].bidValueWei;

        // store winner
        lastBidder = items[_ItemId].highestBidder;
        emit auctionEnded(lastBidder, highestBid);

        //  tranfer highest bid to owner of bid
        msg.sender.transfer(highestBid);

        return true;
    }
}
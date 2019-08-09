pragma solidity >=0.4.0 <0.6.0;

contract Auction {

    struct Item {
        uint id;
        string name;
        uint bidValue;
        uint bidValueStarting;
    }

    // Store accounts that have voted
    mapping(address => bool) public bidders;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Item) public items;
    // Store Candidates Count
    uint public itemsCount;

    // bid event
    event bidEvent (
        uint indexed _itemId
    );

    constructor() public {
        addItem("Vintage Watch", 2000);
        addItem("Vincent Van Gogh - The Starry Night", 50000);
    }

    function addItem(string memory _name, uint _bidStarting) private {
        itemsCount++;
        items[itemsCount] = Item(itemsCount, _name, 0, _bidStarting);
    }

    function bid (uint _ItemId) public {
        // require that they haven't bid before
        require(!bidders[msg.sender],"");

        // require a valid item
        require(_ItemId > 0 && _ItemId <= itemsCount,"");

        // record that bidder has done bidding
        bidders[msg.sender] = true;

        // update candidate bid value increases
        //to be changed
        items[_ItemId].bidValue++;

        // trigger voted event
        emit bidEvent(_ItemId);
    }
}
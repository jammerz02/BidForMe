pragma solidity >=0.4.0 <0.6.0;

contract Auction {

    struct Item {
        uint id;
        string name;
        uint bidValue;
        uint bidValueStarting;
    }

    mapping(uint => Item) public items;

    uint public itemsCount;

    constructor() public {
        addItem("Vintage Watch", 2000);
        addItem("Vincent Van Gogh - The Starry Night", 50000);
    }

    function addItem(string memory _name, uint _bidStarting) private {
        itemsCount++;
        items[itemsCount] = Item(itemsCount, _name, 0, _bidStarting);
    }
}
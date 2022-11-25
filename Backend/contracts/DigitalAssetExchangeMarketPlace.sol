// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract DigitalAssetExchangeMarketPlace is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _itemsSold;

    address payable _owner;

    struct DigitalItem {
        uint256 tokenID;
        address payable Seller;
        address payable Owner;
        uint256 Price;
        bool Status;
    }
    mapping(uint256 => DigitalItem) private digitalItemHistory;
    mapping(address => DigitalItem[]) private ItemHistory;

    uint256 OwnerCharges;

    constructor() ERC721("Digital Asset Exchange MarketPlace ", "DT") {
        _owner = payable(msg.sender);
        OwnerCharges = 0.001 ether; // per Document
    }

    event DigitalItemCreated(
        uint256 indexed tokenID,
        address seller,
        address owner,
        uint256 price,
        bool status
    );

    modifier OnlyOwner() {
        require(
            msg.sender == _owner,
            "Only Market Place Owner Call This Function"
        );
        _;
    }
    modifier checkPrice(uint256 price) {
        require(
            price > 0,
            "Please Set Price Of Digital Assest To Atleast 1 Eth"
        );
        _;
    }
    modifier checkValue() {
        require(
            msg.value == OwnerCharges,
            "Price Must Be Equal To MarketPlace Owner Charges"
        );
        _;
    }

    function MarketPlaceOwnerCharges(uint256 _amount) public payable OnlyOwner {
        OwnerCharges = _amount;
    }

    function getMarketPlaceOwnerCharges() public view returns (uint256) {
        return OwnerCharges;
    }

    //  Create NFT Token For Document

    function MintDigitalItem(uint256 price, string memory uri)
        public
        payable
        returns (uint256)
    {
        _tokenIdCounter.increment();
        uint256 currentTokenId = _tokenIdCounter.current();

        _mint(msg.sender, currentTokenId);

        _setTokenURI(currentTokenId, uri);

        createDigitalItem(currentTokenId, price);
        return currentTokenId;
    }

    function createDigitalItem(uint256 tokenId, uint256 price)
        private
        checkPrice(price)
        checkValue
    {
        digitalItemHistory[tokenId] = DigitalItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        ItemHistory[msg.sender].push(
            DigitalItem(
                tokenId,
                payable(msg.sender),
                payable(address(this)),
                price,
                false
            )
        );

        // Transfer Digital NFT
        _transfer(msg.sender, address(this), tokenId);

        emit DigitalItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    function sellDigitalItem(uint256 tokenId) public payable {
        uint256 price = digitalItemHistory[tokenId].Price;

        require(price == msg.value, "Insufficent Amount!");

        digitalItemHistory[tokenId].Owner = payable(msg.sender);
        digitalItemHistory[tokenId].Seller = payable(address(0));
        digitalItemHistory[tokenId].Status = true;

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(_owner).transfer(OwnerCharges);
        payable(digitalItemHistory[tokenId].Seller).transfer(msg.value);
    }

    function updateDigitalItemPrice(uint256 tokenId, uint256 newPrice)
        public
        payable
        checkValue
    {
        require(
            digitalItemHistory[tokenId].Owner == msg.sender,
            "Only Owner Call This Function"
        );

        digitalItemHistory[tokenId].Status = false;
        digitalItemHistory[tokenId].Price = newPrice;
        digitalItemHistory[tokenId].Owner = payable(address(this));
        digitalItemHistory[tokenId].Seller = payable(msg.sender);

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    //  get market place owner items
    function getMarketPlaceDigitalItem()
        public
        view
        returns (DigitalItem[] memory)
    {
        uint256 totalDigitalAssets = _tokenIdCounter.current();
        uint256 countItem = 0;
        for (uint256 i = 1; i < totalDigitalAssets; i++) {
            if (digitalItemHistory[i].Owner == msg.sender) {
                countItem += 1;
            }
        }
        DigitalItem[] memory list = new DigitalItem[](countItem);

        uint256 j = 0;
        for (uint256 i = 1; i < totalDigitalAssets; i++) {
            if (digitalItemHistory[i].Owner == msg.sender) {
                DigitalItem storage item = digitalItemHistory[i];
                list[j] = item;
                j += 1;
            }
        }
        return list;
    }

    //  get item by purticular seller
    function getDigitalItem() public view returns (DigitalItem[] memory) {
        uint256 totalDigitalAssets = _tokenIdCounter.current();
        uint256 countItem = 0;
        for (uint256 i = 1; i < totalDigitalAssets; i++) {
            if (digitalItemHistory[i].Seller == msg.sender) {
                countItem += 1;
            }
        }
        DigitalItem[] memory list = new DigitalItem[](countItem);

        uint256 j = 0;
        for (uint256 i = 1; i < totalDigitalAssets; i++) {
            if (digitalItemHistory[i].Seller == msg.sender) {
                DigitalItem storage item = digitalItemHistory[i];
                list[j] = item;
                j += 1;
            }
        }
        return list;
    }

    // get unsold items
    function getUnsoldDigitalItem() public view returns (DigitalItem[] memory) {
        uint256 totalDigitalAssets = _tokenIdCounter.current();
        uint256 unsoldCount = totalDigitalAssets - _itemsSold.current();
        DigitalItem[] memory list = new DigitalItem[](unsoldCount);
        uint256 j = 0;
        for (uint256 i = 1; i < totalDigitalAssets; i++) {
            if (digitalItemHistory[i].Owner == address(this)) {
                DigitalItem storage item = digitalItemHistory[i];
                list[j] = item;
                j += 1;
            }
        }
        return list;
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}

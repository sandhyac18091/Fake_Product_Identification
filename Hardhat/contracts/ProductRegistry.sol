
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.30;

contract ProductRegistry {
    struct Product {
        string serialNumber;
        uint256 manufacturerId;
        string productName;
        string productBrand;
        string productDescription;
        bool isExist;
    }

    address public owner;

    event ProductAdded(
        string serialNumber,
        string productName,
        uint256 manufacturerId,
        string productBrand,
        string productDescription
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    mapping(string => Product) private products;

    
    function addProduct(
        string memory _serialNumber,
        uint256 _manufacturerId,
        string memory _productName,
        string memory _productBrand,
        string memory _productDescription
    ) public onlyOwner {
        require(bytes(_serialNumber).length > 0, "Serial number cannot be empty.");
        require(!products[_serialNumber].isExist, "Product with this serial number already exists.");

        products[_serialNumber] = Product({
            serialNumber: _serialNumber,
            manufacturerId: _manufacturerId,
            productName: _productName,
            productBrand: _productBrand,
            productDescription: _productDescription,
            isExist: true
        });

        emit ProductAdded(
            _serialNumber,
            _productName,
            _manufacturerId,
            _productBrand,
            _productDescription
        );
    }

   
    function verifyProduct(string memory _serialNumber)
        public
        view
        returns (
            uint256 manufacturerId,
            string memory productName,
            string memory productBrand,
            string memory productDescription,
            bool isValid
        )
    {
        Product memory product = products[_serialNumber];
        if (product.isExist) {
            return (
                product.manufacturerId,
                product.productName,
                product.productBrand,
                product.productDescription,
                true
            );
        } else {
            return (0, "", "", "", false);
        }
    }
}

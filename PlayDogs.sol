// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PLAYDOGS ERC-721A Smart Contract
 * @author PLAYDOGS Studio
 * @notice Implements gas-efficient batch mints and standard ERC-2981 royalty protocols.
 */

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract PLAYDOGS is ERC721A, ERC2981, Ownable {
    
    // Constants
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 5 ether; // 5 ETH per mint
    
    // State variables
    string public baseTokenURI;
    string public provenanceHash;
    bool public mintActive = false;
    
    // Royalty settings
    address public royaltyReceiver;
    uint96 public constant ROYALTY_BPS = 400; // 400 basis points = 4%

    constructor(
        string memory _initBaseURI, 
        string memory _initProvenanceHash,
        address _royaltyReceiver
    ) 
        ERC721A("PLAYDOGS", "DOGS") 
        Ownable(msg.sender) 
    {
        baseTokenURI = _initBaseURI;
        provenanceHash = _initProvenanceHash;
        royaltyReceiver = _royaltyReceiver;
        
        // Set default royalty for the collection (4% directed to the receiver)
        _setDefaultRoyalty(_royaltyReceiver, ROYALTY_BPS);
    }

    // Public Minting
    function mint(uint256 quantity) external payable {
        require(mintActive, "Minting is currently closed");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Would exceed max collection supply");
        require(msg.value >= MINT_PRICE * quantity, "Insufficient ETH sent for mint");
        
        _safeMint(msg.sender, quantity);
    }

    // Owner Functions
    function toggleMintActive() external onlyOwner {
        mintActive = !mintActive;
    }

    function setBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function setProvenanceHash(string calldata _newProvenanceHash) external onlyOwner {
        provenanceHash = _newProvenanceHash;
    }

    // Withdraw collected funds
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdraw transfer failed");
    }

    // Required overrides for ERC721A, ERC2981 interfaces
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721A, ERC2981) 
        returns (bool) 
    {
        return ERC721A.supportsInterface(interfaceId) 
            || ERC2981.supportsInterface(interfaceId);
    }

    // Update royalty receiver/BPS
    function setRoyaltyInfo(address _receiver, uint96 _feeNumerator) external onlyOwner {
        _setDefaultRoyalty(_receiver, _feeNumerator);
        royaltyReceiver = _receiver;
    }
}

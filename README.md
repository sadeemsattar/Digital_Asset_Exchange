# Digital-Asset-Exchange (BLOCK-CHAIN)

# Abstract:
  In this project we will develop a digital assets exchange platform and explore smart contact vulnerabilities. A digital asset is anything that is created and stored in digital form and is identifiable and has a value. Non-fungible tokens (NFTs) are the assets on a block chain that can be traded in a block chain system.
  A user with an asset will convert into a digital asset and its NFT will be created. The user will post its asset on the website through which it could be traded with another user. A seller will provide an amount to trade their assets. The buyer will purchase the assets and provide the amount with Ethereum. The account created will provide public and private key address where public key address will be used as an identity and to transfer the amount through the block chain. A user registration and login system will be intact n the system for securing the user authentication.
  When user uploads documents on block chain, they will be stored on IPFS that is a decentralized peer to peer storage system. To maintain the integrity of documents upload, strict security system is implemented using digital signatures to maintain the integrity of assets uploaded and to maintain the ownership to the right users. 
  Smart contract vulnerabilities are also explored in this project and one of the notable attack, Reentrancy attack and double spending attack are also implemented

# Functional Requirements:
* User Verification and Digital Signature (Meta-Mask).
* Data integrity using Digital Signature and IPFS.
* Owneship transfer and verification throough Digital Signatures and financing.

# Non-Functional Requirements:
  The non-functional requirements of Web based chatting application are:

* Usability: The user interface is designed by considering the ease of user. It is a friendly and interactive interface.
* Performance: Socket.io is used to increase the performance of Chat app.
* Security: JWB and Bcrypt is used to store the passwords of users in encrypted format in Database.

# Exploiting Smart Contract vulnerabilities through Reentrancy attack:
  Since we are financing the transactions through ethers, the amount send buy the buyers reside in the contract. We have written an attacker contract which will instantiate the market place contract in itself and calls the withdraw function of the marketplace contract that is used to withdraw functions, and transfer those funds into itself.
  This attack is possible whenever a function that requires some funds movements with in itself is defined without using the modifier “payable”.


# Tech:
  The technology used to build the site are

• Solidity
• ERC721 (Smart Contract)
• React JS
• Material UI
• Node JS
• Express JS



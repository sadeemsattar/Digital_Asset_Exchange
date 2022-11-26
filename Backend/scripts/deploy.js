const { ethers } = require("hardhat");

async function main() {
  const DigitalAssetExchangeMarketPlace = await ethers.getContractFactory(
    "DigitalAssetExchangeMarketPlace"
  );

  const DT = await DigitalAssetExchangeMarketPlace.deploy();

  console.log("Contract Deploy At Address :", DT.address);
}

main()
  .then(() => process.emit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

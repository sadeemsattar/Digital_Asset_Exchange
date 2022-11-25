const hardhat = require("hardhat");

async function main() {
  const Lock = await hardhat.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

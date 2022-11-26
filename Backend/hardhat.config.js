/** @type import('hardhat/config').HardhatUserConfig */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.1",

  networks: {
    hardhat: {},
    goerli: {
      url: "https://rpc.ankr.com/optimism_testnet",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

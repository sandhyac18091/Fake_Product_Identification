require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"alchemy",
  solidity: "0.8.30",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    alchemy:{
      url:`https://eth-sepolia.g.alchemy.com/v2/YqzrhGxyV6ZNL7ng8fNGz`,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
};

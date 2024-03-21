import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    dev: {
      url: 'http://localhost:3000',
      gasPrice: 20,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10
      },
    },
    // bsctest: {
    //   url: "",
    //   accounts: [process.env.PRIZ_KEY as string],
    //   gasPrice: 100000000000,
    //   blockGasLimit: 10000000
    // }
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};

export default config;

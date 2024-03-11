import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
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
    }
  }
};

export default config;

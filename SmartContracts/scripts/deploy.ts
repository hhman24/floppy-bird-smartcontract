import { ethers, hardhatArguments } from "hardhat";
import * as Config from './config';

async function main() {
  await Config.initConfig();
  const netWork = hardhatArguments.network || 'dev';
  // ???
  const [deployer] = await ethers.getSigners();
  console.log('deploy from address: ', deployer.address);

  const Floppy = await ethers.getContractFactory("Floppy");
  // version ? 
  const floppy = await Floppy.deploy(deployer.address);
  console.log("Floopy address: ", floppy.getAddress());
  // ?
  Config.setConfig(netWork + '.Floppy', (await floppy.getAddress()));
  await Config.updateConfig();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

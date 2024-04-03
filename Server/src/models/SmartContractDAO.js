import Web3 from 'web3';
import floppyAbi from '../contracts/floppy.json';
import vaultAbi from '../contracts/vault.json';
import { env } from '~/configs/enviroment';

class SmartContractDAO {
  constructor() {
    // Network test
    this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
    this.token_address = env.TOKEN_ADRESS;
    this.vault_address = env.VAULT_ADRESS;
    this.withdrawer_address = env.WITHDRAWER_ADDRESS;
    this.withdrawer_private_key = env.WITHDRAWER_PRIVATE_ADDRESS;
  }

  // retreive the FLP balance of an address
  async getBalance(address) {
    try {
      address = address.toLowerCase();
      const contract = new this.web3.eth.Contract(floppyAbi, this.token_address);
      const bl = await contract.methods.balanceOf(address).call();

      const value = parseInt(bl.toString()) / 10 ** 18;
      return value;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async withdraw(address, amount) {
    this.web3.eth.accounts.wallet.add(this.withdrawer_private_key);
    const vault_contract = await new this.web3.eth.Contract(vaultAbi, this.vault_address);
    //sender privatekey
    var value = Web3.utils.toWei(amount.toString());
    var rs = await vault_contract.methods.withdraw(value, address).send({
      from: this.withdrawer_address,
      gas: 3000000,
    });
    return rs.transactionHash;
  }
}

export default SmartContractDAO;

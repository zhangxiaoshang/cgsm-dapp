import Web3 from 'web3';
import abi from './abis/NFT.json';
import { contract_address_bsctest } from '@/pages/home/vars';

const web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

const contract = new web3.eth.Contract(abi as any, contract_address_bsctest);

export default contract;

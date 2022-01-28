import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { contractConfig } from '@/vars';

const web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
const useContract = (name: string) => {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const { abi, address } = contractConfig[name];
    const _contract = new web3.eth.Contract(abi as any, address);

    setContract(_contract);
  }, [name]);

  return contract;
};

export default useContract;

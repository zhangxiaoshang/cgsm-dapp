import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { contractConfig } from '@/vars';

const web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
const useContract = (chainId?: number) => {
  const [contract, setContract] = useState<any>(null);

  if (!chainId && chainId !== 0) return null;

  useEffect(() => {
    const config = contractConfig[chainId];

    if (config) {
      const _contract = new web3.eth.Contract(config.abi as any, config.address);

      setContract(_contract);
    }
  }, [chainId]);

  return contract;
};

export default useContract;

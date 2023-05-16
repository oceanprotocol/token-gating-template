// @ts-nocheck
import Web3 from 'web3';
import { getOceanConfig } from './ocean';

/**
 * returns a dummy web3 instance, only usable to get info from the chain
 * @param chainId
 * @returns Web3 instance
 */
export async function getDummyWeb3(chainId: number): Promise<Web3> {
  const config = getOceanConfig(chainId);
  return new Web3(config.nodeUri);
}

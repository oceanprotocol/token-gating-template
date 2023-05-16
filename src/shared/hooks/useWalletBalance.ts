import { useCallback, useEffect, useMemo, useState } from 'react';
import { providers, ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import config from '../../../config';
import { formatNumber } from '../utilities/format';
import erc20Abi from '../abi/erc20-abi.json';

type useWalletBalanceProps = {
  provider: providers.Web3Provider | undefined;
};

export default function useWalletBallance({ provider }: useWalletBalanceProps) {
  const {
    network: { networkTokenDecimals },
    oceanNetwork: { contract: oceanContractAddress, networkDecimals },
  } = config;

  const [ethTokenBalance, setEthTokenBalance] = useState(new BigNumber(0));
  const [oceanTokenBalance, setOceanTokenBalance] = useState(new BigNumber(0));

  const ethTokenBalanceFormatted = useMemo(() => formatNumber(ethTokenBalance, 4), [ethTokenBalance]);
  const oceanTokenBalanceFormatted = useMemo(() => formatNumber(oceanTokenBalance, 4), [oceanTokenBalance]);

  const ethTokenFactor = useMemo(() => new BigNumber(10).pow(networkTokenDecimals), [networkTokenDecimals]);
  const oceanTokenFactor = useMemo(() => new BigNumber(10).pow(networkDecimals), [networkDecimals]);

  const getOceanContract = useCallback(() => {
    return new ethers.Contract(oceanContractAddress, erc20Abi, provider);
  }, [oceanContractAddress, provider]);

  const getEthereumBalance = useCallback(async () => {
    const defaultValue = new BigNumber(0);
    if (!provider) {
      return defaultValue;
    }

    try {
      const address = await provider.getSigner().getAddress();
      const balance: ethers.BigNumber = await provider.getBalance(address);
      const networkTokenBalance = new BigNumber(balance.toString());
      return networkTokenBalance.div(ethTokenFactor);
    } catch (ex) {
      return defaultValue;
    }
  }, [ethTokenFactor, provider]);

  const getOceanBalance = useCallback(async () => {
    const defaultValue = new BigNumber(0);
    if (!provider) {
      return defaultValue;
    }

    try {
      const contract = getOceanContract();
      const address = await (provider as ethers.providers.Web3Provider).getSigner().getAddress();
      const balance: ethers.BigNumber = await contract.balanceOf(address);
      const oceanBalanceBn = new BigNumber(balance.toString());
      return oceanBalanceBn.div(oceanTokenFactor);
    } catch (ex) {
      return defaultValue;
    }
  }, [getOceanContract, oceanTokenFactor, provider]);

  const loadEthTokenBalance = useCallback(async () => {
    if (provider) {
      setEthTokenBalance(await getEthereumBalance());
    }
  }, [getEthereumBalance, provider]);

  const loadOceanTokenBalance = useCallback(async () => {
    if (provider) {
      setOceanTokenBalance(await getOceanBalance());
    }
  }, [getOceanBalance, provider]);

  useEffect(() => {
    loadEthTokenBalance().then();
    loadOceanTokenBalance().then();
  }, [loadEthTokenBalance, loadOceanTokenBalance]);

  return {
    ethTokenBalance,
    oceanTokenBalance,

    ethTokenBalanceFormatted,
    oceanTokenBalanceFormatted,

    loadEthTokenBalance,
    loadOceanTokenBalance,
  };
}

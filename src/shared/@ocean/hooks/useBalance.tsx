import { useState, useEffect, useCallback } from 'react';
import { LoggerInstance } from '@oceanprotocol/lib';
import {
  useNetwork,
  useAccount,
  useProvider,
  useBalance as useBalanceWagmi,
} from 'wagmi';
import { fetchBalance } from '@wagmi/core';
import config from '../../../../config';

interface BalanceProviderValue {
  balance: UserBalance;
}

function useBalance(): BalanceProviderValue {
  const { address } = useAccount();
  const { data: balanceNativeToken } = useBalanceWagmi({ address });
  const web3provider = useProvider();
  const { chain } = useNetwork();

  const {
    oceanNetwork: { contract: oceanContractAddress },
  } = config;

  const [balance, setBalance] = useState<UserBalance>({
    eth: '0',
  });
  const getUserBalance = useCallback(async () => {
    if (
      !balanceNativeToken?.formatted ||
      !address ||
      !chain?.id ||
      !web3provider
    )
      return;

    try {
      const oceanBalance = await fetchBalance({
        address,
        token: `0x${oceanContractAddress.slice(2)}`,
      });
      const oceanBalanceFormatted = oceanBalance?.formatted;
      const oceanKey = oceanBalance?.symbol;

      const userBalance = balanceNativeToken?.formatted;
      const key = balanceNativeToken?.symbol;
      const newBalance: UserBalance = { [key]: userBalance };

      newBalance[oceanKey] = oceanBalanceFormatted;
      setBalance(newBalance);
      LoggerInstance.log('[useBalance] Balance: ', newBalance);
    } catch (error) {
      LoggerInstance.error('[useBalance] Error: ', error);
    }
  }, [address, chain?.id, web3provider, balanceNativeToken]);

  useEffect(() => {
    getUserBalance();
  }, [getUserBalance]);

  return { balance };
}

export default useBalance;

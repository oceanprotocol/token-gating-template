import { useState, useEffect, useCallback } from 'react';
import { LoggerInstance } from '@oceanprotocol/lib';
import {
  useNetwork,
  useAccount,
  useProvider,
  useBalance as useBalanceWagmi,
} from 'wagmi';

interface BalanceProviderValue {
  balance: UserBalance;
}

function useBalance(): BalanceProviderValue {
  const { address } = useAccount();
  const { data: balanceNativeToken } = useBalanceWagmi({ address });
  const web3provider = useProvider();
  const { chain } = useNetwork();

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
      const userBalance = balanceNativeToken?.formatted;
      const key = balanceNativeToken?.symbol.toLowerCase();
      const newBalance: UserBalance = { [key]: userBalance };

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

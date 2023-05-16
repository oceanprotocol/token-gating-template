import { providers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ConnectWalletResponseType from '../models/connectWalletResponse';
import {
  getLocalStorageIsMetamaskWalletConnected,
  setLocalStorageIsMetamaskWalletConnected,
} from '../utilities/localStorage';

export type UseMetamaskType = {
  provider?: any;
  web3Provider?: providers.Web3Provider;
  isWalletConnected: boolean;
  isMetamaskInstalled: boolean;
  connect: () => Promise<ConnectWalletResponseType>;
  disconnect: () => void;
  isAccountConnected: () => Promise<boolean>;
  initConnection: () => Promise<boolean>;
  chainId?: number;
  walletName: string | undefined;
};

export default function useMetamask(): UseMetamaskType {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [chainId, setChainId] = useState<number>();

  const provider = useMemo(() => {
    if (typeof window === 'undefined') {
      return;
    }

    return window.ethereum;
  }, []);

  const isMetamaskInstalled = useMemo(() => {
    return typeof provider !== 'undefined';
  }, [provider]);

  const web3Provider = useMemo(() => {
    if (!provider) {
      return undefined;
    }

    return new providers.Web3Provider(provider);
  }, [provider]);

  const walletName = useMemo(() => {
    if (!provider) {
      return undefined;
    }

    return 'MetaMask';
  }, [provider]);

  const updateIsWalletConnected = useCallback((value: boolean) => {
    setIsWalletConnected(value);
    setLocalStorageIsMetamaskWalletConnected(String(value));
  }, []);

  const isAccountConnected = useCallback(async () => {
    if (!web3Provider) {
      return false;
    }

    const accounts = await web3Provider.listAccounts();

    return accounts.length > 0;
  }, [web3Provider]);

  const connect = useCallback(async () => {
    if (!isMetamaskInstalled) {
      return {
        connected: false,
      };
    }

    const permissions: Record<string, unknown>[] = await provider.request({
      method: 'wallet_getPermissions',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

    if (!permissions.length) {
      try {
        await provider.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
      } catch (error) {
        return {
          connected: false,
        };
      }
    }
    if (await isAccountConnected()) {
      updateIsWalletConnected(true);

      return {
        connected: true,
      };
    }

    return { connected: false };
  }, [isAccountConnected, isMetamaskInstalled, provider, updateIsWalletConnected]);

  const disconnect = useCallback(() => {
    updateIsWalletConnected(false);
  }, [updateIsWalletConnected]);

  useEffect(() => {
    isAccountConnected().then((value) => {
      if (!value) {
        disconnect();
      }
    });
  }, [disconnect, isAccountConnected]);

  const initConnection = useCallback(async () => {
    if (!provider) {
      return false;
    }

    const localStorageIsConnected = getLocalStorageIsMetamaskWalletConnected() === 'true';
    if (!localStorageIsConnected) {
      return false;
    }

    const isAccountStillConnected = await isAccountConnected();
    if (!isAccountStillConnected) {
      updateIsWalletConnected(false);
      return false;
    }

    updateIsWalletConnected(true);

    return true;
  }, [isAccountConnected, provider, updateIsWalletConnected]);

  useEffect(() => {
    if (!provider) {
      return;
    }

    provider.request({ method: 'eth_chainId' }).then((result: string) => {
      setChainId(parseInt(result, 16));
    });
  }, [provider]);

  return {
    provider,
    web3Provider,
    isMetamaskInstalled,
    isWalletConnected,
    walletName,
    isAccountConnected,
    connect,
    disconnect,
    initConnection,
    chainId,
  };
}

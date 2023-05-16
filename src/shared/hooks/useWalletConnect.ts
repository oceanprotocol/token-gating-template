import { useCallback, useMemo, useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers, providers } from 'ethers';

import config from '../../../config';
import ConnectWalletResponseType from '../models/connectWalletResponse';
import { getLocalStorageWalletConnect } from '../utilities/localStorage';

export type UseWalletConnectType = {
  provider?: WalletConnectProvider;
  web3Provider?: ethers.providers.Web3Provider;
  connect: () => Promise<ConnectWalletResponseType>;
  disconnect: () => void;
  isWalletConnected: boolean;
  initConnection: () => Promise<boolean>;
  chainId?: number;
  handleErrorEvent: (error: any) => void;
  walletName: string | undefined;
};

export default function useWalletDisconnect(): UseWalletConnectType {
  const [provider, setProvider] = useState<WalletConnectProvider>();

  const web3Provider = useMemo((): providers.Web3Provider | undefined => {
    if (!provider) {
      return undefined;
    }

    return new providers.Web3Provider(provider);
  }, [provider]);

  const chainId = useMemo(() => {
    if (!provider) {
      return undefined;
    }

    return provider.chainId;
  }, [provider]);

  const walletName = useMemo(() => {
    if (!provider) {
      return undefined;
    }

    return provider.walletMeta?.name;
  }, [provider]);

  const handleErrorEvent = useCallback((error: any) => {
    // ignore the errors for unsupported chain
    if (error?.message.includes('No RPC Url available for chainId')) {
      return;
    }

    throw error;
  }, []);

  const connect = useCallback(async (): Promise<ConnectWalletResponseType> => {
    const { acceptedChainId, rpcUrl } = config.network;
    const newProvider = new WalletConnectProvider({
      chainId: acceptedChainId,
      rpc: {
        /**
         * For 1, 3, 4, 5, and 42 WalletConnect tries to use the RPC from Infura, even though no infuraId is provided
         * Because WalletConnect only wants to read the blockNumber we mapped all of them to the same RPC
         */
        1: rpcUrl,
        3: rpcUrl,
        4: rpcUrl,
        5: rpcUrl,
        42: rpcUrl,
        [acceptedChainId]: rpcUrl,
      },
      pollingInterval: 20000,
    });

    newProvider.on('error', handleErrorEvent);

    let addresses;
    try {
      addresses = await newProvider.enable();
    } catch (error) {
      return {
        connected: false,
      };
    }

    newProvider.removeListener('error', handleErrorEvent);

    if (!addresses.length) {
      return {
        connected: false,
      };
    }

    setProvider(newProvider);

    return {
      connected: true,
    };
  }, [handleErrorEvent]);

  const disconnect = useCallback(async () => {
    if (provider) {
      await provider.disconnect();
      setProvider(undefined);
    }
  }, [provider]);

  const isWalletConnected = useMemo(() => !!web3Provider, [web3Provider]);

  const initConnection = useCallback(async () => {
    const walletConnectLocalStorage = getLocalStorageWalletConnect();
    if (!walletConnectLocalStorage) {
      return false;
    }

    const walletConnect = JSON.parse(walletConnectLocalStorage);
    if (!walletConnect.connected) {
      return false;
    }

    const result = await connect();

    return result.connected;
  }, [connect]);

  return {
    provider,
    web3Provider,
    connect,
    disconnect,
    isWalletConnected,
    initConnection,
    chainId,
    handleErrorEvent,
    walletName,
  };
}

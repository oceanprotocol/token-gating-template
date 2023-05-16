import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { providers } from 'ethers';
import BigNumber from 'bignumber.js';

import WalletOptionsEnum from '../const/walletOptionsEnum';
import { getLocalStorageWalletConnectedWith, setLocalStorageWalletConnectedWith } from '../utilities/localStorage';
import useMetamask from './useMetamask';
import useWalletConnect from './useWalletConnect';
import useWalletBalance from './useWalletBalance';
import ConnectWalletResponseType from '../models/connectWalletResponse';
import config from '../../../config';

export type UseWalletConnectionType = {
  disconnect: () => void;
  connect: (wallet: WalletOptionsEnum) => Promise<boolean>;
  web3Provider?: providers.Web3Provider;
  signer?: providers.JsonRpcSigner;
  currentAddress: string;
  connectedWith: WalletOptionsEnum;
  isWalletConnected: boolean;
  provider: any;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
  initConnection: () => Promise<boolean>;
  isAcceptedChainId: boolean;
  handleChainChangedEvent: (newChainId: number) => void;
  handleErrorEvent: (error: any) => void;
  ethTokenBalance: BigNumber;
  oceanTokenBalance: BigNumber;
  ethTokenBalanceFormatted: string;
  oceanTokenBalanceFormatted: string;
  loadEthTokenBalance: () => Promise<void>;
  loadOceanTokenBalance: () => Promise<void>;
  checkChainID: () => void;
  isMetamaskInstalled: boolean;
  isWalletConnectionValid: boolean;
  walletName: string | undefined;
};

export default function useWalletConnection(): UseWalletConnectionType {
  const [connectedWith, setConnectedWith] = useState(WalletOptionsEnum.None);
  const [currentAddress, setCurrentAddress] = useState('');
  const [chainId, setChainId] = useState<number>();
  const [isWalletConnectionValid, setIsWalletConnectionValid] = useState(false);

  const updateConnectedWith = useCallback((value: WalletOptionsEnum) => {
    setConnectedWith(value);
    setLocalStorageWalletConnectedWith(value);
  }, []);

  const {
    provider: metamaskProvider,
    web3Provider: metamaskWeb3Provider,
    connect: connectMetamask,
    disconnect: disconnectMetamask,
    isWalletConnected: isWalletConnectedWithMetamask,
    isMetamaskInstalled,
    initConnection: initConnectionMetamask,
    chainId: chainIdMetamask,
    walletName: metamaskWalletName,
  } = useMetamask();

  const {
    provider: walletConnectProvider,
    web3Provider: walletWeb3ConnectProvider,
    connect: connectWalletConnect,
    disconnect: disconnectWalletConnect,
    isWalletConnected: isWalletConnectedWithWalletConnect,
    initConnection: initConnectionWalletConnect,
    chainId: chainIdWalletConnect,
    handleErrorEvent: handleErrorEventWalletConnect,
    walletName: walletConnectWalletName,
  } = useWalletConnect();

  const provider = useMemo(() => {
    if (walletConnectProvider) {
      return walletConnectProvider;
    }

    return metamaskProvider;
  }, [walletConnectProvider, metamaskProvider]);

  const web3Provider = useMemo(() => {
    if (walletWeb3ConnectProvider) {
      return walletWeb3ConnectProvider;
    }

    if (metamaskWeb3Provider && isWalletConnectedWithMetamask) {
      return metamaskWeb3Provider;
    }

    return undefined;
  }, [metamaskWeb3Provider, walletWeb3ConnectProvider, isWalletConnectedWithMetamask]);

  const walletName = useMemo(() => {
    if (walletConnectWalletName) {
      return walletConnectWalletName;
    }

    return metamaskWalletName;
  }, [walletConnectWalletName, metamaskWalletName]);

  const {
    ethTokenBalance,
    oceanTokenBalance,

    ethTokenBalanceFormatted,
    oceanTokenBalanceFormatted,

    loadEthTokenBalance,
    loadOceanTokenBalance,
  } = useWalletBalance({ provider: web3Provider });

  const connect = useCallback(
    async (walletType: WalletOptionsEnum) => {
      let response: ConnectWalletResponseType;
      if (walletType === WalletOptionsEnum.WalletConnect) {
        response = await connectWalletConnect();
      } else {
        response = await connectMetamask();
      }

      const { connected } = response;
      if (connected) {
        updateConnectedWith(walletType);
      }

      return connected;
    },
    [connectMetamask, connectWalletConnect, updateConnectedWith],
  );

  const disconnect = useCallback(() => {
    if (walletWeb3ConnectProvider) {
      disconnectWalletConnect();
      updateConnectedWith(WalletOptionsEnum.None);
      return;
    }

    disconnectMetamask();
    updateConnectedWith(WalletOptionsEnum.None);
  }, [walletWeb3ConnectProvider, disconnectMetamask, updateConnectedWith, disconnectWalletConnect]);

  const getAccountAddress = useCallback(async () => {
    const defaultValue = '';
    if (!web3Provider) {
      return defaultValue;
    }

    try {
      return await web3Provider.getSigner().getAddress();
    } catch (ex) {
      return defaultValue;
    }
  }, [web3Provider]);

  const handleChainChangedEvent = useCallback((newChainId: number) => {
    setChainId(newChainId);
    window.location.reload();
  }, []);

  const handleErrorEvent = useCallback(
    (error: any) => {
      if (connectedWith === WalletOptionsEnum.WalletConnect) {
        handleErrorEventWalletConnect(error);
        return;
      }

      throw error;
    },
    [connectedWith, handleErrorEventWalletConnect],
  );

  const signer = useMemo(() => web3Provider?.getSigner(), [web3Provider]);
  const isWalletConnected = useMemo(
    () => (isWalletConnectedWithMetamask || isWalletConnectedWithWalletConnect) && !!currentAddress,
    [isWalletConnectedWithMetamask, isWalletConnectedWithWalletConnect, currentAddress],
  );
  const isAcceptedChainId = useMemo(() => {
    return chainId === config.network.acceptedChainId;
  }, [chainId]);

  const checkChainID = useCallback(() => {
    if (isAcceptedChainId) {
      setIsWalletConnectionValid(true);
    } else {
      setIsWalletConnectionValid(false);
    }
    return isAcceptedChainId;
  }, [isAcceptedChainId]);

  const initConnection = useCallback(async (): Promise<boolean> => {
    const localStorageWalletConnectedWith = getLocalStorageWalletConnectedWith();
    if (!localStorageWalletConnectedWith) {
      return false;
    }

    let result;
    if (localStorageWalletConnectedWith === WalletOptionsEnum.Metamask) {
      result = await initConnectionMetamask();
    } else {
      result = await initConnectionWalletConnect();
    }

    if (!result) {
      setLocalStorageWalletConnectedWith(WalletOptionsEnum.None);
      return false;
    }

    setConnectedWith(localStorageWalletConnectedWith);

    return true;
  }, [initConnectionMetamask, initConnectionWalletConnect]);

  useEffect(() => {
    getAccountAddress().then((address: string) => {
      setCurrentAddress(address);
    });
  }, [getAccountAddress]);

  useEffect(() => {
    if (connectedWith === WalletOptionsEnum.None) {
      setChainId(undefined);
      return;
    }

    if (connectedWith === WalletOptionsEnum.WalletConnect) {
      setChainId(chainIdWalletConnect);
      return;
    }

    setChainId(chainIdMetamask);
  }, [chainIdMetamask, chainIdWalletConnect, connectedWith]);

  return {
    web3Provider,
    signer,
    currentAddress,
    connect,
    disconnect,
    connectedWith,
    isWalletConnected,
    provider,
    setCurrentAddress,
    initConnection,
    isAcceptedChainId,
    handleChainChangedEvent,
    handleErrorEvent,
    checkChainID,
    ethTokenBalance,
    oceanTokenBalance,
    ethTokenBalanceFormatted,
    oceanTokenBalanceFormatted,
    loadEthTokenBalance,
    loadOceanTokenBalance,
    isMetamaskInstalled,
    isWalletConnectionValid,
    walletName,
  };
}

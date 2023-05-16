import React, { ReactElement, ReactNode, useCallback, useContext, useMemo, useEffect } from 'react';
import { providers } from 'ethers';
import BigNumber from 'bignumber.js';

import WalletOptionsEnum from '../const/walletOptionsEnum';
import useWalletConnection from '../hooks/useWalletConnection';
import useWalletEvents from '../@ocean/hooks/useWalletEvents';

export type WalletConnectContextType = {
  signer?: providers.JsonRpcSigner;
  web3Provider?: providers.Web3Provider;
  connectedWith: WalletOptionsEnum;
  connect: (wallet: WalletOptionsEnum) => Promise<boolean>;
  currentAddress: string;
  disconnect: () => void;
  isWalletConnected: boolean;
  ethTokenBalance: BigNumber;
  oceanTokenBalance: BigNumber;
  ethTokenBalanceFormatted: string;
  oceanTokenBalanceFormatted: string;
  loadEthTokenBalance: () => Promise<void>;
  loadOceanTokenBalance: () => Promise<void>;
  checkChainID: () => void;
  isAcceptedChainId: boolean;
  isMetamaskInstalled: boolean;
  isWalletConnectionValid: boolean;
  walletName: string | undefined;
};

export const WalletConnectContext = React.createContext<WalletConnectContextType>({} as WalletConnectContextType);

export const WalletConnectProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const {
    signer,
    web3Provider,
    connectedWith,
    isWalletConnected,
    currentAddress,
    connect,
    disconnect,
    provider,
    setCurrentAddress,
    initConnection,
    isAcceptedChainId,
    handleChainChangedEvent,
    handleErrorEvent,
    ethTokenBalance,
    oceanTokenBalance,
    ethTokenBalanceFormatted,
    oceanTokenBalanceFormatted,
    loadEthTokenBalance,
    loadOceanTokenBalance,
    checkChainID,
    isMetamaskInstalled,
    isWalletConnectionValid,
    walletName,
  } = useWalletConnection();

  const handleAccountsChanged = useCallback(
    (data: string[]) => {
      const address = data[0];
      if (!address) {
        disconnect();
        return;
      }

      if (address === currentAddress) {
        return;
      }

      setCurrentAddress(address);
      loadEthTokenBalance().then();
    },
    [currentAddress, disconnect, loadEthTokenBalance, setCurrentAddress],
  );

  useWalletEvents({
    provider,
    handleAccountsChanged,
    handleErrorEvent,
    handleDisconnect: disconnect,
    handleChainChanged: handleChainChangedEvent,
  });

  useEffect(() => {
    checkChainID();
    loadEthTokenBalance().then();
  }, [checkChainID, loadEthTokenBalance]);

  useEffect(() => {
    initConnection().then();
  }, [initConnection]);

  const value: WalletConnectContextType = useMemo(
    () => ({
      signer,
      web3Provider,
      connectedWith,
      connect,
      currentAddress,
      disconnect,
      isWalletConnected,
      isAcceptedChainId,
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
    }),
    [
      connect,
      connectedWith,
      currentAddress,
      disconnect,
      isAcceptedChainId,
      isWalletConnected,
      signer,
      web3Provider,
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
    ],
  );

  return <WalletConnectContext.Provider value={value}>{children}</WalletConnectContext.Provider>;
};

export const useWalletConnectContext = (): WalletConnectContextType => {
  return useContext(WalletConnectContext);
};

import LocalStorageEnum from '../const/localStorageEnum';
import WalletOptionsEnum from '../const/walletOptionsEnum';

export const getLocalStorageWalletConnect = () => {
  return window.localStorage.getItem(LocalStorageEnum.WALLETCONNECT);
};
export const getLocalStorageWalletConnectedWith = () => {
  return localStorage.getItem(LocalStorageEnum.WALLET_CONNECTED_WITH) as WalletOptionsEnum;
};

export const setLocalStorageWalletConnectedWith = (value: string) => {
  return localStorage.setItem(LocalStorageEnum.WALLET_CONNECTED_WITH, value);
};

export const getLocalStorageIsMetamaskWalletConnected = () => {
  return localStorage.getItem(LocalStorageEnum.IS_METAMASK_WALLET_CONNECTED);
};

export const setLocalStorageIsMetamaskWalletConnected = (value: string) => {
  return localStorage.setItem(LocalStorageEnum.IS_METAMASK_WALLET_CONNECTED, value);
};

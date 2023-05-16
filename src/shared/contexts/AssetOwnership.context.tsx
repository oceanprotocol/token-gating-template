import React, { ReactElement, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Asset, AssetDatatoken, Service } from '@oceanprotocol/lib';

import Web3 from 'web3';
import { useCancelToken } from '../@ocean/hooks/useCancelToken';
import { getAsset } from '../@ocean/hooks/useGetAsset';
import { getAccessDetails, getOrderPriceAndFees } from '../@ocean/hooks/useGetAccessDetails';
import config from '../../../config';
import useOrder from '../@ocean/hooks/useOrder';
import { useWalletConnectContext } from './WalletConnect.context';

export type AssetOwnershipContextType = {
  loadAsset: () => Promise<Asset | undefined>;
  verifyAccess: (assetData: Asset) => Promise<AccessDetails[] | undefined>;
  asset: Asset | undefined;
  tokenAccessDetails: AccessDetails[];
  handleOrder: (
    tokenName: string,
    serviceIndex: number,
    AccessDetails: AccessDetails[],
    dataAsset: Asset | undefined,
  ) => Promise<void>;
  isLoadingOrder: boolean;
  setAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
  hasAccess: (index: number) => boolean;
  getServicePrice: (index: number) => string;
  isAcceptedWeb3ChainId: boolean;
  isWeb3WalletConnected: boolean;
  web3WalletAddress: string | undefined;
  totalSpentOnAssets: number;
  totalUnlockedAssets: number;
  unlockedAssetsArray: AccessDetails[];
};

export const AssetOwnershipContext = React.createContext<AssetOwnershipContextType>({} as AssetOwnershipContextType);

export const AssetOwnershipProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const { isMetamaskInstalled } = useWalletConnectContext();
  const { order } = useOrder();

  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [asset, setAsset] = useState<Asset>();
  const [tokenAccessDetails, setTokenAccessDetails] = useState<AccessDetails[]>([]);
  const [chainIdWeb3, setChainIdWeb3] = useState<number>();
  const [isWeb3WalletConnected, setIsWeb3WalletConnected] = useState(false);
  const [web3WalletAddress, setWeb3WalletAddress] = useState<string>();

  const isAcceptedWeb3ChainId = useMemo(() => {
    return chainIdWeb3 === config.network.acceptedChainId;
  }, [chainIdWeb3]);

  const newCancelToken = useCancelToken();

  const loadAsset = useCallback(() => {
    return getAsset(config.did, newCancelToken());
  }, [newCancelToken]);

  const verifyAccess = useCallback(
    async (assetData: Asset) => {
      if (!isMetamaskInstalled) {
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0]) {
        setIsWeb3WalletConnected(true);
        setWeb3WalletAddress(accounts[0]);
      }
      await window.ethereum.request({ method: 'eth_chainId' }).then((result: string) => {
        setChainIdWeb3(parseInt(result, 16));
      });

      const serviceAssetData = [];
      for (let index = 0; index < assetData?.services.length; index += 1) {
        serviceAssetData.push(
          getAccessDetails(
            assetData.chainId,
            assetData.services[index].datatokenAddress,
            assetData.services[index].timeout,
            accounts[0],
          ),
        );
      }
      const accessData = await Promise.all(serviceAssetData);

      setTokenAccessDetails(accessData);
      return accessData;
    },
    [isMetamaskInstalled],
  );

  const handleOrder = useCallback(
    async (tokenName: string, serviceIndex: number, AccessDetails: AccessDetails[], dataAsset: Asset | undefined) => {
      if (!AccessDetails || !dataAsset) {
        return;
      }

      setIsLoadingOrder(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3: Web3 = new Web3(window.ethereum);

      const filteredDataToken = asset?.datatokens.find((token: AssetDatatoken) => token.name === tokenName);
      const indexOfService = asset?.services.findIndex(
        (token: Service) => token.datatokenAddress === filteredDataToken?.address,
      );

      const orderPriceAndFees = await getOrderPriceAndFees(
        dataAsset,
        AccessDetails[serviceIndex],
        web3,
        accounts[0],
        indexOfService,
      );
      await order(web3, dataAsset, AccessDetails[serviceIndex], orderPriceAndFees, accounts[0]);
      setIsLoadingOrder(false);
    },
    [asset?.datatokens, asset?.services, order],
  );

  const hasAccess = useCallback(
    (index: number): boolean => {
      if (!(tokenAccessDetails && tokenAccessDetails[index]?.validOrderTx)) {
        return false;
      }
      return true;
    },
    [tokenAccessDetails],
  );

  const getServicePrice = useCallback(
    (index: number) => {
      return tokenAccessDetails && tokenAccessDetails[index]?.price;
    },
    [tokenAccessDetails],
  );

  const unlockedAssetsArray = useMemo(() => {
    return tokenAccessDetails.filter((item) => item.validOrderTx && item.validOrderTx.length > 0);
  }, [tokenAccessDetails]);

  const totalUnlockedAssets = useMemo(() => {
    return unlockedAssetsArray.length;
  }, [unlockedAssetsArray.length]);

  const totalSpentOnAssets = useMemo(() => {
    const priceArray: string[] = [];
    let totalSpent = 0;

    for (let index = 0; index < unlockedAssetsArray.length; index += 1) {
      priceArray.push(tokenAccessDetails[index].price);
    }

    for (let index = 0; index < priceArray.length; index += 1) {
      totalSpent += parseInt(priceArray[index], 10);
    }

    return totalSpent;
  }, [tokenAccessDetails, unlockedAssetsArray.length]);

  useEffect(() => {
    (async () => {
      await loadAsset().then((data) => {
        setAsset(data);
        if (data) {
          verifyAccess(data);
        }
      });
    })();
  }, [isLoadingOrder, loadAsset, verifyAccess]);

  const value: AssetOwnershipContextType = useMemo(
    (): AssetOwnershipContextType => ({
      loadAsset,
      verifyAccess,
      asset,
      tokenAccessDetails,
      handleOrder,
      isLoadingOrder,
      setAsset,
      hasAccess,
      getServicePrice,
      isAcceptedWeb3ChainId,
      isWeb3WalletConnected,
      web3WalletAddress,
      totalSpentOnAssets,
      totalUnlockedAssets,
      unlockedAssetsArray,
    }),
    [
      loadAsset,
      verifyAccess,
      asset,
      tokenAccessDetails,
      handleOrder,
      isLoadingOrder,
      hasAccess,
      getServicePrice,
      isAcceptedWeb3ChainId,
      isWeb3WalletConnected,
      web3WalletAddress,
      totalSpentOnAssets,
      totalUnlockedAssets,
      unlockedAssetsArray,
    ],
  );

  return <AssetOwnershipContext.Provider value={value}>{children}</AssetOwnershipContext.Provider>;
};

export const useAssetOwnershipContext = (): AssetOwnershipContextType => {
  return useContext(AssetOwnershipContext);
};

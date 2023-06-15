import React, { ReactElement, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Asset, AssetDatatoken, Service } from '@oceanprotocol/lib';

import { useCancelToken } from '../@ocean/hooks/useCancelToken';
import { getAsset } from '../@ocean/hooks/useGetAsset';
import {
  getAccessDetails,
  getOrderPriceAndFees,
} from '../@ocean/hooks/useGetAccessDetails';
import config from '../../../config';
import useOrder from '../@ocean/hooks/useOrder';
import { timeBuffer } from '../utilities/timeBuffer';
import { useAccount, useSigner } from 'wagmi';

export type AssetOwnershipContextType = {
  loadAsset: () => Promise<Asset | undefined>;
  verifyAccess: (assetData: Asset) => Promise<AccessDetails[] | undefined>;
  asset: Asset | undefined;
  tokenAccessDetails: AccessDetails[];
  handleOrder: (
    tokenName: string,
    serviceIndex: number,
    AccessDetails: AccessDetails[],
    dataAsset: Asset | undefined
  ) => Promise<void>;
  isVerifyingAccess: boolean;
  isLoadingOrder: boolean;
  setAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
  hasAccess: (index: number) => boolean;
  getServicePrice: (index: number) => string;
  totalSpentOnAssets: number;
  totalUnlockedAssets: number;
  unlockedAssetsArray: AccessDetails[];
};

export const AssetOwnershipContext =
  React.createContext<AssetOwnershipContextType>(
    {} as AssetOwnershipContextType
  );

export const AssetOwnershipProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const { order } = useOrder();
  const { data: signerWagmi } = useSigner();

  const [isVerifyingAccess, setIsVerifyingAccess] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [asset, setAsset] = useState<Asset>();
  const [tokenAccessDetails, setTokenAccessDetails] = useState<AccessDetails[]>(
    []
  );

  const newCancelToken = useCancelToken();

  const loadAsset = useCallback(() => {
    return getAsset(config.did, newCancelToken());
  }, [newCancelToken]);

  const { address: walletAddress } = useAccount();

  const verifyAccess = useCallback(
    async (assetData: Asset | undefined) => {
      if (!assetData) return;
      if (!walletAddress) return;
      setIsVerifyingAccess(true);
      const serviceAssetData = [];
      for (let index = 0; index < assetData?.services.length; index += 1) {
        serviceAssetData.push(
          getAccessDetails(
            assetData.chainId,
            assetData.services[index].datatokenAddress,
            assetData.services[index].timeout,
            walletAddress
          )
        );
      }
      const accessData = await Promise.all(serviceAssetData);

      setTokenAccessDetails(accessData);
      setIsVerifyingAccess(false);
      return accessData;
    },
    [walletAddress]
  );

  const handleOrder = useCallback(
    async (
      tokenName: string,
      serviceIndex: number,
      AccessDetails: AccessDetails[],
      dataAsset: Asset | undefined
    ) => {
      if (!AccessDetails || !dataAsset || !signerWagmi || !walletAddress) {
        return;
      }
      setIsLoadingOrder(true);

      const filteredDataToken = asset?.datatokens.find(
        (token: AssetDatatoken) => token.name === tokenName
      );
      const indexOfService = asset?.services.findIndex(
        (token: Service) =>
          token.datatokenAddress === filteredDataToken?.address
      );

      const orderPriceAndFees = await getOrderPriceAndFees(
        dataAsset,
        AccessDetails[serviceIndex],
        signerWagmi,
        walletAddress,
        indexOfService
      );
      await order(
        signerWagmi,
        dataAsset,
        AccessDetails[serviceIndex],
        orderPriceAndFees,
        walletAddress.toString()
      ).then(timeBuffer(10000));

      setIsLoadingOrder(false);
    },
    [asset?.datatokens, asset?.services, order]
  );

  const hasAccess = useCallback(
    (index: number): boolean => {
      if (!tokenAccessDetails[index]?.validOrderTx) {
        return false;
      }
      return true;
    },
    [tokenAccessDetails]
  );

  const getServicePrice = useCallback(
    (index: number) => {
      return tokenAccessDetails && tokenAccessDetails[index]?.price;
    },
    [tokenAccessDetails]
  );

  const unlockedAssetsArray = useMemo(() => {
    return tokenAccessDetails.filter(
      (item) => item.validOrderTx && item.validOrderTx.length > 0
    );
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
      isVerifyingAccess,
      isLoadingOrder,
      setAsset,
      hasAccess,
      getServicePrice,
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
      isVerifyingAccess,
      isLoadingOrder,
      hasAccess,
      getServicePrice,
      totalSpentOnAssets,
      totalUnlockedAssets,
      unlockedAssetsArray,
    ]
  );

  return (
    <AssetOwnershipContext.Provider value={value}>
      {children}
    </AssetOwnershipContext.Provider>
  );
};

export const useAssetOwnershipContext = (): AssetOwnershipContextType => {
  return useContext(AssetOwnershipContext);
};

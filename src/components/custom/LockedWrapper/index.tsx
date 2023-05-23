import React from 'react';
import { NextPage } from 'next';
import { Asset } from '@oceanprotocol/lib';
import cs from 'classnames';

import style from './style.module.scss';

import Wrapper from './Wrapper';
import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';

type LockedWrapperPropType = {
  serviceTitle: string;
  serviceIndex: number;
  accessDetails: AccessDetails[];
  asset: Asset | undefined;
  loading: boolean;
};

const LockedWrapper: NextPage<LockedWrapperPropType> = ({
  serviceTitle,
  serviceIndex,
  accessDetails,
  asset,
  loading,
}) => {
  const { hasAccess, getServicePrice, handleOrder } = useAssetOwnershipContext();

  return (
    <div
      className={cs(
        style.wrapperContainer,
        'position-relative mx-0 mx-md-5 d-flex flex-row justify-content-center mt-4',
      )}
    >
      <video autoPlay muted loop src="/AdobeStock_279259623.mov" className={cs(style.imgBlur)} />
      <Wrapper
        show={!hasAccess(serviceIndex)}
        price={getServicePrice(serviceIndex)}
        unlock={() => handleOrder(serviceTitle, serviceIndex, accessDetails, asset)}
        loading={loading}
      />
    </div>
  );
};

export default LockedWrapper;

import React from 'react';
import { NextPage } from 'next';
import Image, { StaticImageData } from 'next/image';
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
  srcBluredImg: string | StaticImageData;
};

const LockedWrapper: NextPage<LockedWrapperPropType> = ({
  serviceTitle,
  serviceIndex,
  accessDetails,
  asset,
  loading,
  srcBluredImg,
}) => {
  const { hasAccess, getServicePrice, handleOrder } = useAssetOwnershipContext();

  return (
    <div className="position-relative mx-0 mx-md-5 d-flex flex-row justify-content-center">
      <Image src={srcBluredImg} alt="bluredGrafic" className={cs(style.imgBlur)} />
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

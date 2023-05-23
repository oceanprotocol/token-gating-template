/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import cx from 'classnames';

import styles from './style.module.scss';
import grafic from '../../../assets/svgexport.svg';
import { DemoAssetsEnum, DemoAssetIndexEnum } from '../../../shared/const/demoAssetsEnum';
import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';
import LockedWrapper from '../../custom/LockedWrapper';
import ContentLayout from '../../custom/ContentLayout';

const Homepage: NextPage = () => {
  const { tokenAccessDetails, isLoadingOrder, asset, hasAccess } = useAssetOwnershipContext();

  return (
    <ContentLayout title="titleHomepage" description="textHomepage" isHomepage>
      {hasAccess(DemoAssetIndexEnum.HOMEPAGE) ? (
        <div className="d-flex flex-row justify-content-center">
          <Image src={grafic} alt="grafic" className={cx(styles.img)} />
        </div>
      ) : (
        <LockedWrapper
          serviceTitle={DemoAssetsEnum.HOMEPAGE}
          serviceIndex={DemoAssetIndexEnum.HOMEPAGE}
          accessDetails={tokenAccessDetails}
          asset={asset}
          loading={isLoadingOrder}
        />
      )}
    </ContentLayout>
  );
};

export default Homepage;

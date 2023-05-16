import React from 'react';
import { NextPage } from 'next';
import cs from 'classnames';

import style from './style.module.scss';

import Address from './Address';
import AssetsDetails from './AssetsDetails';
import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';

const Profile: NextPage = () => {
  const { totalSpentOnAssets, totalUnlockedAssets } = useAssetOwnershipContext();

  return (
    <div className={cs(style.container, 'd-flex flex-column justify-content-start align-items-center')}>
      <Address />
      <AssetsDetails totalSpent={totalSpentOnAssets} totalUnlocked={totalUnlockedAssets} />
    </div>
  );
};

export default Profile;

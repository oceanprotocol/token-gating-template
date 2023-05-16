import { NextPage } from 'next';
import React from 'react';

import Image from 'next/image';

import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';
import unlock from '../../../assets/unlock-padlock 1.svg';
import lock from '../../../assets/lock1.svg';
import lockMobile from '../../../assets/padlock 1.svg';
import unlockMobile from '../../../assets/open-padlock.svg';

type LockPropType = {
  serviceIndex: number;
};

const Lock: NextPage<LockPropType> = ({ serviceIndex }) => {
  const { hasAccess } = useAssetOwnershipContext();

  return hasAccess(serviceIndex) ? (
    <>
      <Image src={unlock} alt="unlocked" className="d-none d-md-block" />
      <Image src={unlockMobile} alt="unlocked mobile" className="d-block d-md-none" width={20} height={20} />
    </>
  ) : (
    <>
      <Image src={lock} alt="locked" className="d-none d-md-block" />
      <Image src={lockMobile} alt="locked mobile" className="d-block d-md-none" width={20} height={20} />
    </>
  );
};

export default Lock;

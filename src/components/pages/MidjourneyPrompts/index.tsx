import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import cx from 'classnames';

import styles from './style.module.scss';

import shark from '../../../assets/a-shark-swimming-underwater-skhgu5wl 2.png';
import mountain from '../../../assets/a-mountain-with-fog-0etdn65b 2.png';
import house from '../../../assets/a-house-on-a-hill-qjo1dqco 2.png';
import boat from '../../../assets/a-boat-in-the-water-rufu2hjm 2.png';
import pirates from '../../../assets/pirates-cove-7tpmrmrf 2.png';
import beehive from '../../../assets/beehive-hd-wallpaper-4k-background-dtcxc08x 1.png';
import liquid from '../../../assets/liquid-splash-hd-wallpaper-4k-background-muxg6uhu 1.png';
import pirat from '../../../assets/a-pirate-ship-in-the-pink-clouds-lxft84fj 2.png';
import shark2 from '../../../assets/a-shark-with-its-mouth-open-1msjr43a 2.png';
import sunset from '../../../assets/a-sunset-over-a-beach-dc7r1uoc 2.png';
import overlooking from '../../../assets/overlooking-the-golden-gate-bridge-a-dramatic-sunset-rss2zxaj 2.png';
import dark from '../../../assets/a-dark-skull-with-gold-ornate-on-it-ax0tyw58 2.png';
import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';
import { DemoAssetsEnum, DemoAssetIndexEnum } from '../../../shared/const/demoAssetsEnum';
import LockedWrapper from '../../custom/LockedWrapper';
import ContentLayout from '../../custom/ContentLayout';

const MidjourneyPrompts: NextPage = () => {
  const { tokenAccessDetails, isLoadingOrder, asset, hasAccess } = useAssetOwnershipContext();

  return (
    <ContentLayout title="titlePage2" description="textPage2">
      {hasAccess(DemoAssetIndexEnum.MIDJOURNEY_PROMPTS) ? (
        <>
          <div className="d-flex flex-row justify-content-center mt-4">
            <Image src={shark} alt="shark image" className={cx(styles.imgSmall, 'mx-1 mx-md-3')} priority />
            <Image src={mountain} alt="mountain image" className={cx(styles.imgSmall, 'mx-1 mx-md-3')} priority />
            <Image
              src={house}
              width={190}
              height={166}
              alt="house image"
              className={cx(styles.imgSmall, 'mx-3 d-none d-md-flex')}
              priority
            />
            <Image src={boat} alt="boat image" className={cx(styles.imgSmall, 'mx-3 d-none d-md-flex')} priority />
            <Image
              src={pirates}
              width={190}
              height={166}
              alt="pirates image"
              className={cx(styles.imgSmall, 'mx-3 d-none d-md-flex')}
              priority
            />
          </div>
          <div className="d-flex flex-row justify-content-center my-1 my-md-4">
            <Image src={beehive} alt="beehive image" className={cx(styles.img, 'mx-3')} priority />
            <Image src={liquid} className={cx(styles.img, 'mx-3 d-none d-md-flex')} alt="liquid image" priority />
          </div>
          <div className="d-flex flex-row justify-content-center mb-4">
            <Image src={pirat} alt="shark image" className={cx(styles.imgSmall, 'mx-1 mx-md-3')} priority />
            <Image src={shark2} alt="mountain image" className={cx(styles.imgSmall, 'mx-1 mx-md-3')} priority />
            <Image
              src={sunset}
              width={190}
              height={166}
              alt="house image"
              className={cx(styles.imgSmall, 'mx-3 d-none d-md-flex')}
              priority
            />
            <Image
              src={overlooking}
              width={190}
              height={166}
              alt="boat image"
              className={cx(styles.imgSmall, 'mx-3 d-none d-md-flex')}
              priority
            />
            <Image
              src={dark}
              width={190}
              height={166}
              alt="pirates image"
              className={cx(styles.imgSmall, 'mx-3 d-none d-md-flex')}
              priority
            />
          </div>
        </>
      ) : (
        <LockedWrapper
          serviceTitle={DemoAssetsEnum.MIDJOURNEY_PROMPTS}
          serviceIndex={DemoAssetIndexEnum.MIDJOURNEY_PROMPTS}
          accessDetails={tokenAccessDetails}
          asset={asset}
          loading={isLoadingOrder}
        />
      )}
    </ContentLayout>
  );
};

export default MidjourneyPrompts;

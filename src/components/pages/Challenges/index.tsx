import React from 'react';
import { NextPage } from 'next';
import cs from 'classnames';

import style from './style.module.scss';

import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';
import { DemoAssetsEnum, DemoAssetIndexEnum } from '../../../shared/const/demoAssetsEnum';
import LockedWrapper from '../../custom/LockedWrapper';
import CardChallenges from '../../custom/Cards/CardChallenges';
import useChallenges from './useChallenges';
import ContentLayout from '../../custom/ContentLayout';

const Challenges: NextPage = () => {
  const { tokenAccessDetails, asset, isLoadingOrder, hasAccess } = useAssetOwnershipContext();
  const { CardsContent } = useChallenges();

  return (
    <ContentLayout title="titlePage3" description="textPage3">
      {hasAccess(DemoAssetIndexEnum.CHALLENGES) ? (
        <>
          <div
            className={cs(
              style.container,
              'd-flex flex-column flex-md-row justify-content-center align-items-center flex-nowrap flex-md-wrap',
            )}
          >
            {CardsContent.map((content) => {
              return (
                <CardChallenges
                  key={content.id}
                  srcImg={content.image}
                  title={content.title}
                  description={content.text}
                />
              );
            })}
          </div>
        </>
      ) : (
        <LockedWrapper
          serviceTitle={DemoAssetsEnum.CHALLENGES}
          serviceIndex={DemoAssetIndexEnum.CHALLENGES}
          accessDetails={tokenAccessDetails}
          asset={asset}
          loading={isLoadingOrder}
        />
      )}
    </ContentLayout>
  );
};

export default Challenges;

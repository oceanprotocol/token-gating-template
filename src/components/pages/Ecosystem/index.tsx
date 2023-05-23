import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';

import styles from './style.module.scss';

import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';
import { DemoAssetIndexEnum, DemoAssetsEnum } from '../../../shared/const/demoAssetsEnum';
import CardEcosystem from '../../custom/Cards/CardEcosystem';
import LockedWrapper from '../../custom/LockedWrapper';
import useEcosystem from './useEcosystem';

const Ecosystem: NextPage = () => {
  const { t } = useTranslation('common');
  const { tokenAccessDetails, asset, hasAccess, isLoadingOrder } = useAssetOwnershipContext();
  const { CardContent } = useEcosystem();

  return (
    <div className="my-5">
      <div className="mx-2 mx-md-5 text-center">
        <div className="text-center signikaBold40 mb-5">{t('titlePage4')}</div>
        <div className={cx(styles.text, 'mb-5 mb-md-0')}>{t('textPage4')}</div>
      </div>
      {hasAccess(DemoAssetIndexEnum.CHALLENGES) ? (
        <>
          <div
            className={cx(
              styles.container,
              'd-flex flex-column flex-md-row justify-content-center flex-nowrap flex-md-wrap',
            )}
          >
            {CardContent.map((content) => {
              return (
                <CardEcosystem
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
    </div>
  );
};

export default Ecosystem;

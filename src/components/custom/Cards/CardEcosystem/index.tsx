import React from 'react';
import { NextPage } from 'next';
import Image, { StaticImageData } from 'next/image';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';

import styles from './style.module.scss';

type CardEcosystemPropType = {
  title: string;
  description: string;
  srcImg: string | StaticImageData;
};

const CardEcosystem: NextPage<CardEcosystemPropType> = ({ title, description, srcImg }) => {
  const { t } = useTranslation('common');

  return (
    <div className={cx(styles.container, 'mx-3 d-flex flex-row flex-md-column align-items-center')}>
      <Image src={srcImg} alt="event1" className={cx(styles.img)} />
      <div>
        <div className="signikaBold25 text-start text-md-center mx-1">{t(`${title}`)}</div>
        <div className={cx(styles.justify, 'signikaBold15 mx-1')}>{t(`${description}`)}</div>
      </div>
    </div>
  );
};

export default CardEcosystem;

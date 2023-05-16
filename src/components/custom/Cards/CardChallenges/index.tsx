import React from 'react';
import { NextPage } from 'next';
import Image, { StaticImageData } from 'next/image';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';

import styles from './style.module.scss';

type CardChallengesPropType = {
  title: string;
  description: string;
  srcImg: string | StaticImageData;
};

const CardChallenges: NextPage<CardChallengesPropType> = ({ title, description, srcImg }) => {
  const { t } = useTranslation('common');

  return (
    <div className={cx(styles.container, 'mx-0 mx-md-3 mt-0 mt-md-5')}>
      <Image src={srcImg} alt="event1" />
      <div className="signikaBold25 text-start mx-1 my-2">{t(`${title}`)}</div>
      <div className="signikaLight15 mx-1">{t(`${description}`)}</div>
    </div>
  );
};

export default CardChallenges;

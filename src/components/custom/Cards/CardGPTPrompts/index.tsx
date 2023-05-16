import React, { useCallback } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import cx from 'classnames';

import styles from './style.module.scss';

import hearth from '../../../../assets/hearth.svg';
import chat from '../../../../assets/chatButton.svg';
import hearthIcon from '../../../../assets/heart1.svg';
import view from '../../../../assets/view1.svg';

type CardGPTPropmtsPropType = {
  title: string;
  description: string;
  likes: string;
  views: string;
};

const CardGPTPropmts: NextPage<CardGPTPropmtsPropType> = ({ title, description, likes, views }) => {
  const { t } = useTranslation('common');

  const trimmedDescription = useCallback((string: string, length: number) => {
    const trimmedString = string.length > length ? `${string.substring(0, length - 3)}...` : string;

    return trimmedString;
  }, []);

  return (
    <div className={cx(styles.container, 'mx-0 mx-md-5 mt-0 mt-md-5')}>
      <div className="d-flex justify-content-end">
        <Image src={hearth} alt="hearth logo" />
      </div>
      <div className={cx(styles.title, 'signikaBold25 text-start')}>{title}</div>
      <div className={cx(styles.textContainer, 'signikaLight15')}>{trimmedDescription(t(`${description}`), 245)}</div>
      <div className="d-flex flex-row mt-3 justify-content-between align-center">
        <Link href="https://chat.openai.com/auth/login" target="_blank">
          <Image src={chat} alt="chat button" />
        </Link>
        <div className="d-flex flex-row">
          <div className="d-flex flex-row align-center">
            <Image src={hearthIcon} alt="heart logo" />
            <div className="ms-2 bold">{likes}</div>
          </div>
          <div className="d-flex flex-row align-center ms-3">
            <Image src={view} alt="heart logo" />
            <div className="ms-2 bold">{views}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGPTPropmts;

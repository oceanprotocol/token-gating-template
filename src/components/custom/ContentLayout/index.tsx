import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import cs from 'classnames';

import styles from './style.module.scss';

type ContentLayoutPropType = {
  title: string;
  description: string;
  isHomepage?: boolean;
  children: ReactNode;
};

const ContentLayout: NextPage<ContentLayoutPropType> = ({ title, description, isHomepage, children }) => {
  const { t } = useTranslation('common');

  return (
    <div className="my-5">
      <div className={cs('mx-4 mx-md-5', !isHomepage ? 'text-center' : '')}>
        <div className="text-center signikaBold40 mb-5">{t(`${title}`)}</div>
        <div className={cs('mb-5', !isHomepage ? [styles.text, 'mb-md-0 signikaLight18'] : '')}>
          {t(`${description}`)}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ContentLayout;

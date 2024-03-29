import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

import logoHeader from '../../../assets/logo.svg';
import Lock from '../Lock';
import useVerticalMenu from './hooks/useVerticalMenu';
import config from '../../../../config';

type VerticalMenuPropsType = {
  isExpanded: boolean;
};

const {
  routes: { homepage },
} = config;

const VerticalMenu: NextPage<VerticalMenuPropsType> = ({ isExpanded }) => {
  const { t } = useTranslation(['common']);
  const router = useRouter();

  const { MenuLinks } = useVerticalMenu();

  return (
    <div
      className={cx([
        styles.expandVerticalMenu,
        'bg-black text-white pb-3 d-none d-md-flex flex-column',
        { [styles.collapseVerticalMenu]: isExpanded },
      ])}
    >
      <Link href={homepage} className="mx-auto">
        <Image
          src={logoHeader}
          alt="logo"
          className={cx(styles.headerLogo, 'mt-5')}
        />
      </Link>
      <div className="d-flex flex-column mt-5 px-2">
        {MenuLinks.map((link) => {
          return (
            <React.Fragment key={link.id}>
              <Link
                className={cx(
                  styles.navBtn,
                  'mb-3 d-flex flex-row justify-content-between align-items-center',
                  router.pathname === link.href ? styles.activeNavBtn : ''
                )}
                href={link.href}
              >
                <div>{t(`${link.title}`)}</div>
                <Lock serviceIndex={link.index} />
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalMenu;

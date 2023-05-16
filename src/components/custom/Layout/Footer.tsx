/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import cs from 'classnames';
import config from '../../../../config';

import styles from './styles.module.scss';
import Logo from '../../../assets/logoFooter.svg';

const {
  routes: { homepage, chatgptPrompts, midjourneyPrompts, challanges, ecosystem },
} = config;

const Footer: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <nav className="bg-black px-5 mt-5">
      <div className="d-flex flex-column flex-md-row justify-content-between w-100 p-3">
        <div className="d-flex flex-row flex-md-column align-items-center order-1 order-md-0 my-3">
          <Link href="#">
            <Image src={Logo} alt="navbar logo" />
          </Link>
          <div className={cs(styles.textFooter, 'mt-0 mt-md-3 ms-4 ms-md-0')}>
            © Ocean Gate
            <br />
            All rights reserved
          </div>
        </div>
        <div className={cs('collapse navbar-collapse d-flex justify-content-beetwen order-0 order-md-1')}>
          <ul className="w-100 d-flex flex-row justify-content-around">
            <div className="d-flex flex-column justify-content-between my-3 me-5 me-md-0">
              <Link className="mx-0 mx-md-3 mb-0 mb-md-3 text-white" href={homepage}>
                <div className="signikaMedium14">{t('homepage')}</div>
              </Link>
              <Link className="mx-0 mx-md-3 my-3 my-md-0 text-white d-flex text-align-center" href={homepage}>
                <div className="signikaMedium14">{t('profile')}</div>
              </Link>
              <Link className="mx-0 mx-md-3 text-white d-flex d-md-none" href={chatgptPrompts}>
                <div className="signikaMedium14">{t('chatgptPrompts')}</div>
              </Link>
            </div>
            <div className="my-3">
              <Link className="mx-0 mx-md-3 mb-3 text-white d-none d-md-flex" href={chatgptPrompts}>
                <div className="signikaMedium14">{t('chatgptPrompts')}</div>
              </Link>
              <Link className="mx-0 mx-md-3 text-white d-none d-md-flex" href={midjourneyPrompts}>
                <div className="signikaMedium14">{t('midjourneyPrompts')}</div>
              </Link>
            </div>
            <div className="d-flex flex-column justify-content-between my-3">
              <Link className="mx-0 mx-md-3 mb-0 mb-md-3 text-white d-flex d-md-none" href={midjourneyPrompts}>
                <div className="signikaMedium14">{t('midjourneyPrompts')}</div>
              </Link>
              <Link className="mx-0 mx-md-3 my-3 my-md-0 text-white d-flex text-align-center" href={challanges}>
                <div className="signikaMedium14">{t('challanges')}</div>
              </Link>
              <Link className="mx-0 mx-md-3 text-white" href={ecosystem}>
                <div className="signikaMedium14">{t('ecosystem')}</div>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Footer;

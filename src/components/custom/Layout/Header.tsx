import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import styles from './styles.module.scss';

import personLogo from '../../../assets/person-circle.svg';
import walletLogo from '../../../assets/globeSettings.svg';
import AcceptedChains from '../WalletAuth/AcceptedChain';
import logoHeader from "../../../assets/logo-mobile.svg";
import ConnectWalletModal from '../ConnectWalletModal';
import NavBar from '../../../assets/expandLogo.svg';
import useHeader from './hooks/useHeader';
import config from '../../../../config';
import WalletAuth from '../WalletAuth';
import Lock from '../Lock';
import Wallet from '../Wallet';

type HeaderPropsType = {
  toggleMenu: () => void;
  isExpanded: boolean;
};

const {
  routes: { homepage, profile },
} = config;

const Header: NextPage<HeaderPropsType> = ({ toggleMenu, isExpanded }) => {
  const { t } = useTranslation(['common']);
  const {
    NavigationLinks,
    isBurgerMenuOpen,
    handleBurgerMenuClick,
    handleBurgerClose,
  } = useHeader();

  return (
    <>
      <div>
        <nav
          className={cx(
            styles.bgHeader,
            'navbar navbar-expand-lg navbar-black bg-black px-3'
          )}
        >
          <div className="d-flex flex-row justify-content-between w-100 py-3">
            <div className="w-100 w-md-auto me-0 me-md-5">
              <button
                type="button"
                className="clean-empty-button"
                onClick={toggleMenu}
              >
                <Image
                  className={cx(
                    isExpanded ? styles.expandButton : styles.nonExpandButton,
                    'd-none d-md-flex'
                  )}
                  src={NavBar}
                  alt="navbar logo"
                />
              </button>
              <div className="d-flex flex-row d-md-none justify-content-between align-items-center">
                <Link href={homepage}>
                  <Image
                    src={logoHeader}
                    alt="navbar logo"
                    className={cx(styles.mobileHeaderLogo, 'ms-2')}
                  />
                </Link>
                <div
                  className={cx(
                    styles.burgerButton,
                    'd-flex d-md-none order-0 me-2'
                  )}
                  onClick={handleBurgerMenuClick}
                />
              </div>
            </div>
            <AcceptedChains />
            <div
              className={cx(
                'collapse navbar-collapse d-md-flex justify-content-end d-none'
              )}
            >
              <ul className="navbar-nav">
                <Wallet />
                <Link
                  className={cx(
                    styles.navLink,
                    'nav-item mx-3 d-none d-md-flex'
                  )}
                  href={profile}
                >
                  <Image src={personLogo} alt="person logo" />
                </Link>
                <Link
                  className={cx(
                    styles.navLink,
                    'nav-item mx-3 d-none d-md-flex'
                  )}
                  href="/"
                >
                  <Image src={walletLogo} alt="wallet logo" />
                </Link>
              </ul>
            </div>
          </div>
          {isBurgerMenuOpen && (
            <div
              className={cx(
                styles.mobileHeaderContainer,
                styles.bgHeader,
                'd-flex d-md-none px-0'
              )}
            >
              <div
                className={cx(
                  'd-flex d-md-none flex-column justify-content-start align-items-center w-100 mb-5'
                )}
              >
                {NavigationLinks.map((link) => {
                  return (
                    <React.Fragment key={link.id}>
                      <Link
                        href={link.href}
                        onClick={handleBurgerClose}
                        className={cx(
                          styles.linkMobile,
                          'd-flex flex-row my-2'
                        )}
                      >
                        {link.index !== undefined && (
                          <Lock serviceIndex={link.index} />
                        )}
                        {link.image && (
                          <Image src={link.image} alt="lock image" />
                        )}
                        <div className="ms-3 UrbanistRegular16">
                          {t(`${link.title}`)}
                        </div>
                      </Link>
                    </React.Fragment>
                  );
                })}
                <Wallet mobile />
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;

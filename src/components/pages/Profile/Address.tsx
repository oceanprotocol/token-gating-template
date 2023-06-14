import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import cs from 'classnames';

import style from './style.module.scss';

import WalletPortrait from '../../../assets/profile_logo.svg';
import CopyBtnImg from '../../../assets/copy_btn.svg';
import externalLink from '../../../assets/right-up.svg';
import { truncateWalletAddress } from '../../../shared/utilities/truncateAddress';
import useProfile from './useProfile';
import { useAccount } from 'wagmi';
import { useTranslation } from 'next-i18next';
import Copy from '../../custom/Copy';

const Address: NextPage = () => {
  const { t } = useTranslation('common');
  const { address } = useAccount();
  const { ExplorerLinks } = useProfile();

  return (
    <>
      {!address ? (
        <div>{t('walletNotConnected')}</div>
      ) : (
        <div
          className={cs(
            style.addressContainer,
            'd-flex flex-column flex-md-row justify-content-center align-items-start align-md-items-center mb-2 mb-md-5'
          )}
        >
          <Image src={WalletPortrait} alt="Wallet Portrait" />
          <div className="d-flex flex-column mt-4 mt-md-0 ms-0 ms-md-3">
            <div className="d-flex flex-row justify-content-start signikaBold30 colorRaisinBlack">
              {truncateWalletAddress(address, 4)}
              <Copy text={address} />
            </div>
            <div className="UrbanistRegular18 mt-2">{address}</div>
            <div
              className={cs(
                style.linkBox,
                'd-flex flex-row justify-content-between flex-wrap'
              )}
            >
              {ExplorerLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href.concat(address?.toString())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex flex-row align-items-center clean-empty-hyperlink me-3 mt-3"
                >
                  <Image src={link.logo} alt="ethereum logo" />
                  <div className="UrbanistLight14 ms-1">{link.name}</div>
                  <Image src={externalLink} alt="external up" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;

import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import cs from 'classnames';

import styles from './style.module.scss';

import { useWalletConnectContext } from '../../../shared/contexts/WalletConnect.context';
import WalletConnectLogo from '../../../assets/walletconnect-seeklogo.com.svg';
import MetamaskLogo from '../../../assets/MetaMask_Fox.svg';
import WalletAddressAndDetails from './WalletAddressAndDetails';

type WalletAuthPropType = {
  openModal: () => void;
};

const WalletAuth: NextPage<WalletAuthPropType> = ({ openModal }) => {
  const { isWalletConnected } = useWalletConnectContext();

  if (isWalletConnected) {
    return <WalletAddressAndDetails />;
  }

  return (
    <div className="position-relative">
      <button type="button" className="clean-empty-button" onClick={openModal}>
        <Image src={MetamaskLogo} width={32} height={32} alt="metamask logo" />
        <div className={cs(styles.absoluteImage)}>
          <Image src={WalletConnectLogo} width={32} height={32} alt="wallet logo" />
        </div>
      </button>
    </div>
  );
};

export default WalletAuth;

import React, { useCallback } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import cs from 'classnames';

import style from './style.module.scss';

import MetaMaskLogo from '../../../assets/MetaMask_Fox.svg';
import WalletConnectLogo from '../../../assets/walletconnect-seeklogo.com.svg';
import WalletOptionsEnum from '../../../shared/const/walletOptionsEnum';

type ConnectWalletButtonProps = {
  onClick: (option: WalletOptionsEnum) => void;
  disabled?: boolean;
  option: WalletOptionsEnum;
};

const ConnectWalletButton: NextPage<ConnectWalletButtonProps> = ({ onClick, option, disabled }) => {
  const handleClick = useCallback(() => {
    onClick(option);
  }, [onClick, option]);

  return (
    <button
      type="button"
      className={cs([
        option === WalletOptionsEnum.Metamask ? style.optionBlockMetamask : style.optionBlockWalletConnect,
        disabled ? style.disabled : '',
      ])}
      onClick={handleClick}
      disabled={disabled}
    >
      {option === WalletOptionsEnum.Metamask ? (
        <div className="d-flex flex-column justify-content-between align-items-center">
          <Image src={MetaMaskLogo} alt="metamask_logo" priority width={65} height={65} />
          <div className="signikaMedium24 fw-bold">MetaMask</div>
          <div>connect to your MetaMask Wallet</div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-between align-items-center">
          <Image src={WalletConnectLogo} alt="walletconnect_logo" priority width={65} height={65} />
          <div className="signikaMedium24 fw-bold">WalletConnect</div>
          <div>scan with WalletConnect to connect</div>
        </div>
      )}
    </button>
  );
};

export default ConnectWalletButton;

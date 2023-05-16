import React, { useCallback, useMemo, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import cs from 'classnames';

import styles from './style.module.scss';

import { useWalletConnectContext } from '../../../shared/contexts/WalletConnect.context';
import { truncateWalletAddress } from '../../../shared/utilities/truncateAddress';
import ConnectedWalletLogo from '../../../assets/demo_connected_wallet.svg';
import ChevronDown from '../../../assets/chevron_down.svg';
import WalletConnectLogo from '../../../assets/walletconnect-seeklogo.com.svg';
import MetamaskLogo from '../../../assets/MetaMask_Fox.svg';
import OceanLogo from '../../../assets/OCEAN_logo.svg';
import WalletOptionsEnum from '../../../shared/const/walletOptionsEnum';

const WalletAddressAndDetails: NextPage = () => {
  const { currentAddress, ethTokenBalanceFormatted, oceanTokenBalanceFormatted, walletName, disconnect } =
    useWalletConnectContext();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = useCallback((state: boolean) => {
    setShowDetails(!state);
  }, []);

  const walletLogo = useMemo(() => {
    if (walletName === WalletOptionsEnum.Metamask) {
      return MetamaskLogo;
    }

    return WalletConnectLogo;
  }, [walletName]);

  const walletDetails = useMemo(() => {
    return (
      <div className={cs(styles.details, 'd-flex flex-column justify-content-between')}>
        <div className={styles.modalTip} />
        <div className={cs(styles.balance, 'd-flex flex-column UrbanistExtraLight14')}>
          <div className="d-flex flex-row">
            <div>MATIC</div>
            <div className="UrbanistBold14 ms-2">{ethTokenBalanceFormatted}</div>
          </div>
          <div className="d-flex flex-row">
            <div>OCEAN</div>
            <div className="UrbanistBold14 ms-2">{oceanTokenBalanceFormatted}</div>
          </div>
        </div>
        <div className={cs(styles.actions, 'd-flex flex-column')}>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row align-items-center">
              <Image src={walletLogo} alt={`${walletName}_logo`} width={25} height={25} />
              <span className="UrbanistExtraLight14 ms-2">{walletName}</span>
            </div>
            <div className="UrbanistExtraBold11 colorAmaranth col-4">
              <button type="button" className="clean-empty-button ">
                SWITCH WALLET
              </button>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center mt-2">
            <button type="button" className="clean-empty-button">
              <div className="d-flex flex-row align-items-center">
                <Image src={OceanLogo} alt="ocean-logo" />
                <span className="UrbanistExtraBold11 colorAmaranth ms-2">ADD OCEAN</span>
              </div>
            </button>
            <div className="UrbanistExtraBold11 colorAmaranth col-4">
              <button type="button" className="clean-empty-button" onClick={disconnect}>
                DISCONNECT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [disconnect, ethTokenBalanceFormatted, oceanTokenBalanceFormatted, walletLogo, walletName]);

  return (
    <div className="d-flex flex-row align-items-center">
      <button type="button" className="clean-empty-button" onClick={() => toggleDetails(showDetails)}>
        <div className={cs('d-flex flex-row align-items-center pointer')}>
          <Image src={ConnectedWalletLogo} alt="wallet_connected_logo" />
          <div className="text-white UrbanistExtraLight14 mx-2">{truncateWalletAddress(currentAddress)}</div>
          <Image src={ChevronDown} alt="ChevronDown" />
        </div>
      </button>
      {showDetails && walletDetails}
    </div>
  );
};

export default WalletAddressAndDetails;

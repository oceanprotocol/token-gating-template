import React, { useCallback } from 'react';
import { NextPage } from 'next';
import cs from 'classnames';

import style from './style.module.scss';

import { useWalletConnectContext } from '../../../shared/contexts/WalletConnect.context';
import WalletOptionsEnum from '../../../shared/const/walletOptionsEnum';
import ConnectWalletButton from './ConnectWalletButton';

type ConnectWalletModalPropsType = {
  showModal: boolean;
  onClose: () => void;
};

const ConnectWalletModal: NextPage<ConnectWalletModalPropsType> = ({ showModal, onClose }) => {
  const { connect, connectedWith, disconnect, isMetamaskInstalled, isWalletConnected } = useWalletConnectContext();

  const onWalletOptionButtonClick = useCallback(
    async (option: WalletOptionsEnum) => {
      if (connectedWith !== WalletOptionsEnum.None) {
        disconnect();
        onClose();
      }
      await connect(option);
      if (!isWalletConnected) {
        onClose();
        return;
      }
      onClose();
    },
    [onClose, connect, connectedWith, disconnect, isWalletConnected],
  );

  return (
    <>
      {showModal && (
        <div className={style.backDrop} onClick={onClose}>
          <div className={cs([style.body, 'position-relative'])} onClick={(e) => e.stopPropagation()}>
            <div className={cs(style.container, 'd-flex flex-column flex-md-row justify-content-between h-100')}>
              <ConnectWalletButton
                onClick={onWalletOptionButtonClick}
                option={WalletOptionsEnum.Metamask}
                disabled={!isMetamaskInstalled}
              />
              <ConnectWalletButton onClick={onWalletOptionButtonClick} option={WalletOptionsEnum.WalletConnect} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectWalletModal;

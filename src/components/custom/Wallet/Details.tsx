import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDisconnect, useAccount, useConnect } from 'wagmi';
import { useModal } from 'connectkit';
import styles from './Details.module.scss';
import Button from '../Button';
import useBalance from '../../../shared/@ocean/hooks/useBalance';
import MetamaskLogo from '../../../assets/MetaMask_Fox.svg';
import WalletConnectLogo from '../../../assets/walletconnect-seeklogo.com.svg';
import CoinbaseLogo from '../../../assets/coinbase-wallet-logo.svg';
import { formatNumber } from '../../../shared/utilities/format';
import BigNumber from 'bignumber.js';

export default function Details(): ReactElement {
  const { connector: activeConnector } = useAccount();
  const { connect } = useConnect();
  const { setOpen } = useModal();
  const { disconnect } = useDisconnect();
  const { balance } = useBalance();

  return (
    <div className={styles.details}>
      <ul>
        {Object.entries(balance).map(([key, value]) => (
          <li className={styles.balance} key={key}>
            <span className={styles.symbol}>{key.toUpperCase()}</span>
            <span className={styles.value}>
              {formatNumber(new BigNumber(value), 5)}
            </span>
          </li>
        ))}

        <li className={styles.actions}>
          <div title="Connected provider" className={styles.walletInfo}>
            <span className={styles.walletLogoWrap}>
              {activeConnector?.name === 'MetaMask' && (
                <Image
                  className={styles.walletLogo}
                  src={MetamaskLogo}
                  alt="metamask logog"
                />
              )}
              {activeConnector?.name === 'WalletConnectLegacy' && (
                <Image
                  className={styles.walletLogo}
                  src={WalletConnectLogo}
                  alt="metamask logog"
                />
              )}
              {activeConnector?.name === 'Coinbase Wallet' && (
                <Image
                  className={styles.walletLogo}
                  src={CoinbaseLogo}
                  alt="metamask logog"
                />
              )}
              {activeConnector?.name.replace('Legacy', '')}
            </span>
          </div>
          <p>
            <Button
              className={styles.magentaText}
              style="text"
              size="small"
              onClick={async () => {
                connect();
                setOpen(true);
              }}
            >
              Switch Wallet
            </Button>
            <Button
              className={styles.magentaText}
              style="text"
              size="small"
              onClick={() => {
                disconnect();
                location.reload();
              }}
            >
              Disconnect
            </Button>
          </p>
        </li>
      </ul>
    </div>
  );
}

import React, { ReactElement } from 'react';
import Account from './Account';
import styles from './index.module.scss';
import { useAccount } from 'wagmi';
import Tooltip from '../Tooltip';
import Details from './Details';

export default function Wallet(): ReactElement {
  const { address: accountId } = useAccount();

  return (
    <div className={styles.wallet}>
      <Tooltip
        content={<Details />}
        trigger="click focus"
        disabled={!accountId}
      >
        <Account />
      </Tooltip>
    </div>
  );
}

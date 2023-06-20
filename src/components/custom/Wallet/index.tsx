import React, { ReactElement } from 'react';
import Account from './Account';
import styles from './index.module.scss';
import { useAccount } from 'wagmi';
import Tooltip from '../Tooltip';
import Details from './Details';

type WalletPropType = {
  mobile?: boolean;
};

export default function Wallet({ mobile }: WalletPropType): ReactElement {
  const { address: accountId } = useAccount();

  return (
    <div className={(styles.wallet, 'w-100 mt-2 mt-md-0')}>
      <Tooltip
        content={<Details />}
        trigger="click focus"
        disabled={!accountId}
      >
        <Account mobile={mobile} />
      </Tooltip>
    </div>
  );
}

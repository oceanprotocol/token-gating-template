import React, { FormEvent, ReactElement } from 'react';
import Caret from '../../../assets/caret.svg';
// import Loader from '@shared/atoms/Loader'
import styles from './Account.module.css';
import {
  useAccount,
  useEnsName,
  useEnsAvatar,
  useBalance,
  useNetwork,
  useProvider,
} from 'wagmi';
import { useModal } from 'connectkit';
import Avatar from '../Avatar';
import Image from 'next/image';
import { accountTruncate } from '../../../shared/@ocean/utilities/wallet';

// Forward ref for Tippy.js
// eslint-disable-next-line
export default function Account(): ReactElement {
  const { address: accountId } = useAccount();
  const { data: accountEns } = useEnsName({ address: accountId, chainId: 1 });
  const { data: accountEnsAvatar } = useEnsAvatar({
    address: accountId,
    chainId: 1,
  });
  const { data: balanceNativeToken } = useBalance({ address: accountId });
  const web3provider = useProvider();
  const { chain } = useNetwork();
  const { setOpen } = useModal();

  async function handleActivation(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    setOpen(true);
  }

  return accountId ? (
    <button
      className={styles.button}
      aria-label="Account"
      onClick={(e) => e.preventDefault()}
    >
      {/* <Avatar accountId={accountId} src={accountEnsAvatar} /> */}
      <span className={styles.address} title={accountId}>
        {accountTruncate(accountEns || accountId)}
      </span>
      <Image
        src={Caret}
        alt="caret"
        className={styles.caret}
        aria-hidden="true"
      />
    </button>
  ) : (
    <button
      className={`${styles.button} ${styles.initial}`}
      onClick={(e) => handleActivation(e)}
    >
      Connect <span>Wallet</span>
    </button>
  );
}

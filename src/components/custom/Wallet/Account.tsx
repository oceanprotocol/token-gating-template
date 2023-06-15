import React, { FormEvent, ReactElement } from 'react';
import Caret from '../../../assets/caret.svg';
import CaretBlack from '../../../assets/caret_black.svg';
import styles from './Account.module.scss';
import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';
import { useModal } from 'connectkit';
import Image from 'next/image';
import Avatar from '../Avatar';
import { truncateWalletAddress } from '../../../shared/utilities/truncateAddress';

type AccountPropType = {
  mobile?: boolean;
};

// Forward ref for Tippy.js
// eslint-disable-next-line
export default function Account({ mobile }: AccountPropType): ReactElement {
  const { address: accountId } = useAccount();
  const { data: accountEns } = useEnsName({ address: accountId, chainId: 1 });
  const { data: accountEnsAvatar } = useEnsAvatar({
    address: accountId,
    chainId: 1,
  });
  const { setOpen } = useModal();

  async function handleActivation(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    setOpen(true);
  }

  return accountId && accountEnsAvatar !== null ? (
    <button
      className={styles.button}
      aria-label="Account"
      onClick={(e) => e.preventDefault()}
    >
      <Avatar accountId={accountId} src={accountEnsAvatar} />
      <span className={styles.address} title={accountId}>
        {truncateWalletAddress(accountEns || accountId, mobile ? 12 : 4)}
      </span>
      {mobile ? (
        <Image
          src={CaretBlack}
          alt="caret"
          className={styles.caret}
          aria-hidden="true"
        />
      ) : (
        <Image
          src={Caret}
          alt="caret"
          className={styles.caret}
          aria-hidden="true"
        />
      )}
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

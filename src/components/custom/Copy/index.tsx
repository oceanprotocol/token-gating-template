import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Clipboard from 'react-clipboard.js';

import styles from './index.module.scss';

import IconCopy from '../../../assets/copy_btn.svg';

type CopyPropsType = {
  text: string;
};

export default function Copy({ text }: CopyPropsType): ReactElement {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <Clipboard
      data-clipboard-text={text}
      button-title="Copy to clipboard"
      onSuccess={() => setIsCopied(true)}
      className={styles.button}
    >
      <div className={styles.action}>
        <Image src={IconCopy} alt="icont-copy" className={styles.icon} />
        {isCopied && <div className={styles.feedback}>{t('copied')}</div>}
      </div>
    </Clipboard>
  );
}

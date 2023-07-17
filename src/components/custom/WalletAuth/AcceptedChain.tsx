import React from 'react';
import { NextPage } from 'next';
import cs from 'classnames';

import config from '../../../../config';
import { useWalletConnectContext } from '../../../shared/contexts/WalletConnect.context';

const AcceptedChains: NextPage = () => {
  const { isAcceptedChainId, isWalletConnected } = useWalletConnectContext();

  if (isWalletConnected && !isAcceptedChainId) {
    return (
      <div
        className={cs(
          'signikaLight18 text-light mx-auto w-100 d-none d-md-flex flex-row justify-content-center align-items-center'
        )}
      >
        {config.network.pleaseSelectNetwork[config.network.acceptedChainId]}
      </div>
    );
  }
  return <></>;
};

export default AcceptedChains;

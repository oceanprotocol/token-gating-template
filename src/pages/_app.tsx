import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from "next-i18next";

import '../styles/globals.scss';

import { WalletConnectProvider } from '../shared/contexts/WalletConnect.context';
import Layout from '../components/custom/Layout';
import { AssetOwnershipProvider } from '../shared/contexts/AssetOwnership.context';
import UrqlProvider from '../shared/@ocean/context/UrqlProvider';

export function App({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider>
      <WalletConnectProvider>
        <AssetOwnershipProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AssetOwnershipProvider>
      </WalletConnectProvider>
    </UrqlProvider>
  );
}

export default appWithTranslation(App);

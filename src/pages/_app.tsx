import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from "next-i18next";

import '../styles/globals.scss';

import { WalletConnectProvider } from '../shared/contexts/WalletConnect.context';
import Layout from '../components/custom/Layout';
import { AssetOwnershipProvider } from '../shared/contexts/AssetOwnership.context';
import UrqlProvider from '../shared/@ocean/context/UrqlProvider';
import { WagmiConfig } from 'wagmi';
import {
  connectKitTheme,
  wagmiClient,
} from '../shared/@ocean/utilities/wallet';
import { ConnectKitProvider } from 'connectkit';

export function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider theme="auto" mode="dark">
        <UrqlProvider>
          <WalletConnectProvider>
            <AssetOwnershipProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AssetOwnershipProvider>
          </WalletConnectProvider>
        </UrqlProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default appWithTranslation(App);

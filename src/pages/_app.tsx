import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/globals.scss';

import { WalletConnectProvider } from '../shared/contexts/WalletConnect.context';
import Layout from '../components/custom/Layout';
import { AssetOwnershipProvider } from '../shared/contexts/AssetOwnership.context';
import UrqlProvider from '../shared/@ocean/context/UrqlProvider';

const queryClient = new QueryClient();

export function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UrqlProvider>
        <WalletConnectProvider>
          <AssetOwnershipProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AssetOwnershipProvider>
        </WalletConnectProvider>
      </UrqlProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);

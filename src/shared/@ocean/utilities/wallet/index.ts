import { createClient } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { getDefaultClient } from 'connectkit';

// Wagmi client
export const wagmiClient = createClient(
  getDefaultClient({
    appName: 'Ocean Token Gated',
    infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
    // TODO: mapping between appConfig.chainIdsSupported and wagmi chainId
    chains: [polygonMumbai],
  })
);

// ConnectKit CSS overrides
// https://docs.family.co/connectkit/theming#theme-variables
export const connectKitTheme = {
  '--ck-font-family': 'var(--font-family-base)',
  '--ck-border-radius': 'var(--border-radius)',
  '--ck-overlay-background': 'var(--background-body-transparent)',
  '--ck-modal-box-shadow': '0 0 20px 20px var(--box-shadow-color)',
  '--ck-body-background': 'var(--background-body)',
  '--ck-body-color': 'var(--font-color-text)',
  '--ck-primary-button-border-radius': 'var(--border-radius)',
  '--ck-primary-button-color': 'var(--font-color-heading)',
  '--ck-primary-button-background': 'var(--background-content)',
  '--ck-secondary-button-border-radius': 'var(--border-radius)',
};

export function accountTruncate(account: string): string | undefined {
  if (!account || account === '') return;
  const middle = account.substring(6, 38);
  const truncated = account.replace(middle, '…');
  return truncated;
}

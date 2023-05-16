import { useEffect } from 'react';

type useWalletEventsProps = {
  provider: any;
  handleAccountsChanged: (data: string[]) => void;
  handleDisconnect: () => void;
  handleChainChanged: (newChainId: number) => void;
  handleErrorEvent: (error: any) => void;
};

export default function useWalletEvents({
  provider,
  handleAccountsChanged,
  handleDisconnect,
  handleChainChanged,
  handleErrorEvent,
}: useWalletEventsProps) {
  useEffect(() => {
    if (!provider) {
      return;
    }

    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('disconnect', handleDisconnect);
    provider.on('chainChanged', handleChainChanged);
    provider.on('error', handleErrorEvent);

    // eslint-disable-next-line consistent-return
    return () => {
      provider.removeListener('accountsChanged', handleAccountsChanged);
      provider.removeListener('disconnect', handleDisconnect);
      provider.removeListener('chainChanged', handleChainChanged);
      provider.removeListener('error', handleErrorEvent);
    };
  }, [provider, handleAccountsChanged, handleDisconnect, handleChainChanged, handleErrorEvent]);
}

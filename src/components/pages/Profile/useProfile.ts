import { useMemo } from 'react';
import config from '../../../../config';

import ethLogo from '../../../assets/Ethereum_logo_2014.svg';
import polygonLogo from '../../../assets/polygon-matic-logo.svg';
import bscLogo from '../../../assets/Binance_Logo.svg';
import moonriverLogo from '../../../assets/Moonriver_logo.svg';
import energyWebChainLogo from '../../../assets/Energy_web_chain.svg';

export default function useProfile() {
  const {
    routes: {
      explorer: { ethMainnet, ethGoerli, polygon, mumbai, binance, moonriver, energyWebChain },
    },
  } = config;

  const ExplorerLinks = useMemo(
    () => [
      {
        id: 1,
        logo: ethLogo,
        name: 'ETH',
        href: ethMainnet,
      },
      {
        id: 2,
        logo: polygonLogo,
        name: 'Polygon',
        href: polygon,
      },
      {
        id: 3,
        logo: bscLogo,
        name: 'BSC',
        href: binance,
      },
      {
        id: 4,
        logo: moonriverLogo,
        name: 'Moonriver',
        href: moonriver,
      },
      {
        id: 5,
        logo: ethLogo,
        name: 'Görli',
        href: ethGoerli,
      },
      {
        id: 6,
        logo: polygonLogo,
        name: 'Mumbai',
        href: mumbai,
      },
      {
        id: 7,
        logo: energyWebChainLogo,
        name: 'Energy Web Chain',
        href: energyWebChain,
      },
    ],
    [binance, energyWebChain, ethGoerli, ethMainnet, moonriver, mumbai, polygon],
  );

  return { ExplorerLinks };
}

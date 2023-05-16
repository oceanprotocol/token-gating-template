import { useMemo } from 'react';

import event1 from '../../../assets/Ocean Event 1.svg';
import event2 from '../../../assets/Ocean Event 2 1.svg';
import event3 from '../../../assets/Ocean Event 1 (1).svg';
import event4 from '../../../assets/Ocean Event 2 1 (1).svg';
import event5 from '../../../assets/Ocean Event 2 1 (2).svg';
import event6 from '../../../assets/Ocean Event 2 1 (3).svg';

export default function useChallenges() {
  const CardsContent = useMemo(
    () => [
      {
        id: 1,
        image: event1,
        title: 'Air Quality Data Challenge Winners',
        text: 'Drumroll, please! We announce today the winners of Ocean Protocol s first Air Quality in Catalunya data prediction challenge.',
      },
      {
        id: 2,
        image: event2,
        title: 'Predict-ETH Round Data Challenge 4 is Live',
        text: 'Ocean s Predict-ETH data challenge is an exciting opportunity for data scientists to showcase their skills and potentially win big. This competition revolves around building a model.',
      },
      {
        id: 3,
        image: event3,
        title: 'Winners of the Predict-ETH Round 3 Data Challenge',
        text: 'Predict-ETH Round 3 just completed. First, second and third place go to Andrey Bessalov ($2500), Tanut Choksatchawathi ($1500), and M.N. ($1000) respectively.',
      },
      {
        id: 4,
        image: event4,
        title: 'Liquidity Provisioning Strategies Data Challenge',
        text: '              From automated market makers (AMMs) to order book-based exchanges and liquidity pools, explain how liquidity provisioning strategies and incentive structures affect the performance of DEXs.',
      },
      {
        id: 5,
        image: event5,
        title: 'Faculty Group allocates USD$5mil',
        text: 'Faculty Capital, the venture capital division of Faculty Group, has pledged $5 million USD to support the Ocean project ecosystem fund. The Faculty Group and Ocean Protocol collaboration',
      },
      {
        id: 6,
        image: event6,
        title: 'Ocean Protocol and Dimitra launch Ideation Bounty',
        text: 'Ocean Protocol, the Web3 platform to unlock data services for AI and business innovation, announces the launch of ideation bounties in a joint initiative with its long-term partner Dimitra, a company',
      },
    ],
    [],
  );

  return { CardsContent };
}

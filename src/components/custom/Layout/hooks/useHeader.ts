import { useCallback, useMemo, useState } from 'react';

import config from '../../../../../config';
import profileLogo from '../../../../assets/person-circle (1).svg';
import { DemoAssetIndexEnum } from '../../../../shared/const/demoAssetsEnum';

const {
  routes: {
    homepage,
    chatgptPrompts,
    midjourneyPrompts,
    challanges,
    ecosystem,
    profile,
  },
} = config;

export default function useHeader() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const handleBurgerClose = () => {
    setIsBurgerMenuOpen(false);
  };

  const NavigationLinks = useMemo(
    () => [
      {
        id: 1,
        href: homepage,
        index: DemoAssetIndexEnum.HOMEPAGE,
        title: 'GPT-4',
      },
      {
        id: 2,
        href: chatgptPrompts,
        index: DemoAssetIndexEnum.CHATGPT_PROMPTS,
        title: 'ChatGPT Prompts',
      },
      {
        id: 3,
        href: midjourneyPrompts,
        index: DemoAssetIndexEnum.MIDJOURNEY_PROMPTS,
        title: 'High Value NFTs',
      },
      {
        id: 4,
        href: challanges,
        index: DemoAssetIndexEnum.CHALLENGES,
        title: 'Ocean Challenges',
      },
      {
        id: 5,
        href: ecosystem,
        index: DemoAssetIndexEnum.ECOSYSTEM,
        title: 'Ocean Ecosystem',
      },
      {
        id: 6,
        href: profile,
        image: profileLogo,
        title: 'My Profile',
      },
    ],
    []
  );

  return {
    NavigationLinks,
    isBurgerMenuOpen,
    handleBurgerMenuClick,
    handleBurgerClose,
  };
}

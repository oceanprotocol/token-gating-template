import { useCallback, useMemo, useState } from 'react';

import config from '../../../../../config';
import profileLogo from '../../../../assets/person-circle (1).svg';
import walletMobile from '../../../../assets/walletMobile.svg';
import metamaskMobile from '../../../../assets/metamaskMobile.svg';
import { DemoAssetIndexEnum } from '../../../../shared/const/demoAssetsEnum';

const {
  routes: { homepage, chatgptPrompts, midjourneyPrompts, challanges, ecosystem, profile },
} = config;

export default function useHeader() {
  const [showModal, setShowModal] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

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
      {
        id: 7,
        href: 'Connect wallet',
        image: metamaskMobile,
        title: 'Connect wallet',
      },
      {
        id: 8,
        href: 'Currency & network settings',
        image: walletMobile,
        title: 'Currency & network settings',
      },
    ],
    [],
  );

  return {
    NavigationLinks,
    showModal,
    openModal,
    closeModal,
    isBurgerMenuOpen,
    handleBurgerMenuClick,
    handleBurgerClose,
  };
}

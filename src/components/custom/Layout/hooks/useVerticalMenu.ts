import { useMemo } from 'react';
import { DemoAssetIndexEnum } from '../../../../shared/const/demoAssetsEnum';
import config from '../../../../../config';

const {
  routes: { homepage, chatgptPrompts, midjourneyPrompts, challanges, ecosystem },
} = config;

export default function useVerticalMenu() {
  const MenuLinks = useMemo(
    () => [
      {
        id: 1,
        title: 'GPT-4',
        index: DemoAssetIndexEnum.HOMEPAGE,
        href: homepage,
      },
      {
        id: 2,
        title: 'ChatGPT Prompts',
        index: DemoAssetIndexEnum.CHATGPT_PROMPTS,
        href: chatgptPrompts,
      },
      {
        id: 3,
        title: 'High Value NFTs',
        index: DemoAssetIndexEnum.MIDJOURNEY_PROMPTS,
        href: midjourneyPrompts,
      },
      {
        id: 4,
        title: 'Ocean Challenges',
        index: DemoAssetIndexEnum.CHALLENGES,
        href: challanges,
      },
      {
        id: 5,
        title: 'Ocean Ecosystem',
        index: DemoAssetIndexEnum.CHALLENGES,
        href: ecosystem,
      },
    ],
    [],
  );

  return { MenuLinks };
}

import { useMemo } from 'react';

export default function useChatGPTPrompts() {
  const CardsContent = useMemo(
    () => [
      {
        id: 1,
        title: 'Midjourney Prompt Generator',
        text: 'textContainer1',
        view1: '44',
        view2: '610',
      },
      {
        id: 2,
        title: 'Spoken English Teacher and Improver',
        text: 'textContainer2',
        view1: '69',
        view2: '690',
      },
      {
        id: 3,
        title: 'Unconstrained AI model DAN',
        text: 'textContainer3',
        view1: '54',
        view2: '770',
      },
      {
        id: 4,
        title: 'Startup Idea Generator',
        text: 'textContainer4',
        view1: '49',
        view2: '660',
      },
      {
        id: 5,
        title: 'Social Media Influencer',
        text: 'textContainer5',
        view1: '57',
        view2: '730',
      },
      {
        id: 6,
        title: 'Fullstack Software Developer',
        text: 'textContainer6',
        view1: '34',
        view2: '580',
      },
    ],
    [],
  );

  return { CardsContent };
}

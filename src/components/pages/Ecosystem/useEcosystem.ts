import { useMemo } from 'react';

import event1 from '../../../assets/1.svg';
import event2 from '../../../assets/2.svg';
import event3 from '../../../assets/3.svg';
import event4 from '../../../assets/4.svg';
import event5 from '../../../assets/5.svg';
import event6 from '../../../assets/6.svg';
import event7 from '../../../assets/7.svg';
import event8 from '../../../assets/8.svg';

export default function useEcosystem() {
  const CardContent = useMemo(
    () => [
      {
        id: 1,
        image: event1,
        title: 'Ocean Waves',
        text: 'page4Container1',
      },
      {
        id: 2,
        image: event2,
        title: 'WeDataNation',
        text: 'page4Container2',
      },
      {
        id: 3,
        image: event3,
        title: 'walt.id',
        text: 'page4Container3',
      },
      {
        id: 4,
        image: event4,
        title: 'peaq',
        text: 'page4Container4',
      },
      {
        id: 5,
        image: event5,
        title: 'DataX',
        text: 'page4Container5',
      },
      {
        id: 6,
        image: event6,
        title: 'FELT Labs',
        text: 'page4Container6',
      },
      {
        id: 7,
        image: event7,
        title: 'Swash',
        text: 'page4Container7',
      },
      {
        id: 8,
        image: event8,
        title: 'TokenSPICE',
        text: 'page4Container8',
      },
    ],
    [],
  );

  return { CardContent };
}

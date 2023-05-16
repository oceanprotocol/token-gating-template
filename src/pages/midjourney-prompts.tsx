import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../../config';
import MidjourneyPrompts from '../components/pages/MidjourneyPrompts';

export default function Page2() {
  return <MidjourneyPrompts />;
}

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations(config.language, config.translateLists)),
    },
  };
}

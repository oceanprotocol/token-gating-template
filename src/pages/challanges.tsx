import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../../config';
import Challenges from '../components/pages/Challenges';

export default function PageThree() {
  return <Challenges />;
}

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations(config.language, config.translateLists)),
    },
  };
}

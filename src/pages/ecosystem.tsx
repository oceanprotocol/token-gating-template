import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../../config';
import Ecosystem from '../components/pages/Ecosystem';

export default function PageFour() {
  return <Ecosystem />;
}

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations(config.language, config.translateLists)),
    },
  };
}

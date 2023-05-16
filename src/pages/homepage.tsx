import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../../config';
import Homepage from '../components/pages/Homepage';

export default function Home() {
  return <Homepage />;
}

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations(config.language, config.translateLists)),
    },
  };
}

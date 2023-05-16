import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Homepage from '../components/pages/Homepage';
import config from '../../config';

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

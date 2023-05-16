import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../../config';
import Profile from '../components/pages/Profile';

export default function Home() {
  return <Profile />;
}

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations(config.language, config.translateLists)),
    },
  };
}

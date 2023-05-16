import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import config from '../../config';
import ChatGPTPrompts from '../components/pages/ChatGPTPrompts';

export default function Page1() {
  return <ChatGPTPrompts />;
}

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations(config.language, config.translateLists)),
    },
  };
}

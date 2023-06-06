import React from 'react';
import { NextPage } from 'next';

import { useAssetOwnershipContext } from '../../../shared/contexts/AssetOwnership.context';
import { DemoAssetIndexEnum, DemoAssetsEnum } from '../../../shared/const/demoAssetsEnum';
import LockedWrapper from '../../custom/LockedWrapper';
import CardGPTPropmts from '../../custom/Cards/CardGPTPrompts';
import useChatGPTPrompts from './useChatGPTPrompts';
import ContentLayout from '../../custom/ContentLayout';

const ChatGPTPrompts: NextPage = () => {
  const {
    tokenAccessDetails,
    isLoadingOrder,
    isVerifyingAccess,
    asset,
    hasAccess,
  } = useAssetOwnershipContext();
  const { CardsContent } = useChatGPTPrompts();

  return (
    <>
      <ContentLayout title="titlePage1" description="textPage1">
        {hasAccess(DemoAssetIndexEnum.CHATGPT_PROMPTS) ? (
          <div className="mx-5">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center flex-nowrap flex-md-wrap">
              {CardsContent.map((content) => {
                return (
                  <CardGPTPropmts
                    key={content.id}
                    title={content.title}
                    description={content.text}
                    likes={content.view1}
                    views={content.view2}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <LockedWrapper
            serviceTitle={DemoAssetsEnum.CHATGPT_PROMPTS}
            serviceIndex={DemoAssetIndexEnum.CHATGPT_PROMPTS}
            accessDetails={tokenAccessDetails}
            asset={asset}
            loading={isLoadingOrder || isVerifyingAccess}
          />
        )}
      </ContentLayout>
    </>
  );
};

export default ChatGPTPrompts;

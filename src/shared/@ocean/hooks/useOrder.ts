// @ts-nocheck
import {
  amountToUnits,
  approve,
  Datatoken,
  FixedRateExchange,
  FreOrderParams,
  LoggerInstance,
  OrderParams,
  ProviderFees,
  ProviderInitialize,
  ProviderInstance,
} from '@oceanprotocol/lib';
import { providers } from "ethers";
import Web3 from "web3";
import { TransactionReceipt } from "web3-eth";
import config from "../../../../config";
import { getOceanConfig } from "../utilities/ocean";

export default function useOrder() {
  async function initializeProvider(
    asset: AssetExtended,
    accountId: string,
    providerFees?: ProviderFees
  ): Promise<ProviderInitialize> {
    if (providerFees) return;
    try {
      const provider = await ProviderInstance.initialize(
        asset.id,
        asset.services[0].id,
        0,
        accountId,
        asset.services[0].serviceEndpoint
      );
      return provider;
    } catch (error) {
      LoggerInstance.log("[Initialize Provider] Error:", error);
    }
  }

  async function order(
    web3: providers.Web3Provider,
    asset: AssetExtended,
    accessDetails: AccessDetails,
    orderPriceAndFees: OrderPriceAndFees,
    accountId: string,
    providerFees?: ProviderFees,
    computeConsumerAddress?: string
  ): Promise<TransactionReceipt> {
    const signer = await web3.getSigner();
    const datatoken = new Datatoken(signer);
    const configOcean = getOceanConfig(asset.chainId);

    if (!signer) {
      return;
    }

    const initializeData = await initializeProvider(
      asset,
      accountId,
      providerFees
    );

    const orderParams = {
      consumer: computeConsumerAddress || accountId,
      serviceIndex: 0,
      _providerFee: providerFees || initializeData.providerFee,
      _consumeMarketFee: {
        consumeMarketFeeAddress: config.oceanApp.marketFeeAddress,
        consumeMarketFeeAmount: config.oceanApp.consumeMarketOrderFee,
        consumeMarketFeeToken:
          accessDetails?.baseToken?.address ||
          "0x0000000000000000000000000000000000000000",
      },
    } as OrderParams;

    const freParams = {
      exchangeContract: configOcean.fixedRateExchangeAddress,
      exchangeId: accessDetails.addressOrId,
      maxBaseTokenAmount: orderPriceAndFees.price,
      baseTokenAddress: accessDetails?.baseToken?.address,
      baseTokenDecimals: accessDetails?.baseToken?.decimals || 18,
      swapMarketFee: config.oceanApp.consumeMarketFixedSwapFee,
      marketFeeAddress: config.oceanApp.marketFeeAddress,
    } as FreOrderParams;

    if (accessDetails.templateId === 1) {
      if (!configOcean.fixedRateExchangeAddress) {
        return;
      }
      // buy datatoken
      const amount = await amountToUnits(
        signer,
        accessDetails?.baseToken?.address,
        orderPriceAndFees.price
      );
      const txApprove = await approve(
        signer,
        configOcean,
        accountId,
        accessDetails.baseToken.address,
        configOcean.fixedRateExchangeAddress,
        amount,
        false
      );
      console.log(txApprove);
      if (!txApprove) {
        return;
      }

      const fre = new FixedRateExchange(
        configOcean.fixedRateExchangeAddress,
        signer
      );

      const freTx = await fre.buyDatatokens(
        accessDetails?.addressOrId,
        "1",
        orderPriceAndFees.price,
        config.oceanApp.marketFeeAddress,
        config.oceanApp.consumeMarketFixedSwapFee
      );

      const tx: any = await datatoken.startOrder(
        accessDetails.datatoken.address,
        orderParams.consumer,
        orderParams.serviceIndex,
        orderParams._providerFee,
        orderParams._consumeMarketFee
      );
      return tx;
    }
    if (accessDetails.templateId === 2) {
      const txApprove = await approve(
        signer,
        configOcean,
        accountId,
        accessDetails.baseToken.address,
        accessDetails.datatoken.address,
        await amountToUnits(
          signer,
          accessDetails?.baseToken?.address,
          orderPriceAndFees.price
        ),
        false
      );
      if (!txApprove) {
        return;
      }
      return await datatoken.buyFromFreAndOrder(
        accessDetails.datatoken.address,
        orderParams,
        freParams
      );
    }
  }

  return { order };
}

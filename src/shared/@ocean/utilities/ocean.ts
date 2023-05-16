import { Config, ConfigHelper } from '@oceanprotocol/lib';

export function getOceanConfig(network: string | number): Config {
  const config: Config = new ConfigHelper().getConfig(
    network,
    network === 'polygon' ||
      network === 'moonbeamalpha' ||
      network === 1287 ||
      network === 'bsc' ||
      network === 56 ||
      network === 'gaiaxtestnet' ||
      network === 2021000
      ? undefined
      : process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  ) as Config;
  return config as Config;
}

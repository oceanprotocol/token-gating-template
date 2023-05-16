import { Asset } from '@oceanprotocol/lib';
import axios, { AxiosResponse, CancelToken } from 'axios';
import config from '../../../../config';

export async function getAsset(did: string, cancelToken: CancelToken): Promise<Asset | undefined> {
  try {
    const response: AxiosResponse<Asset> = await axios.get(
      `${config.oceanApp.metadataCacheUri}/api/aquarius/assets/ddo/${did}`,
      {
        cancelToken,
      },
    );

    return { ...response.data };
  } catch (error) {
    if (axios.isCancel(error)) {
      // eslint-disable-next-line
      console.log(error.message);
    } else {
      throw error;
    }
  }
}

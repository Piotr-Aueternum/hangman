import * as constans from './constans';
import Api from './api_client';

const { url, apiKey, randomWord } = constans;
export const getWord = query => Api.init({
  url,
  query: { ...query, api_key: apiKey },
  pathname: randomWord,
});

export default { getWord };

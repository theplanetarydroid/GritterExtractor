import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';
import { getInstance } from './useInstance';


export async function getContent(usernameData: string): Promise<CheerioAPI> {
  return axios
    .get(`${getInstance()}/${usernameData}`)
    .then(({ data }) => load(data));
}

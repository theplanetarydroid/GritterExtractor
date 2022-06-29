import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';

export async function getContent(url: string): Promise<CheerioAPI> {
  return axios.get(url).then(({ data }) => load(data));
}

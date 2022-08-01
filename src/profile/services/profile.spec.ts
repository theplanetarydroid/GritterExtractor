import { ProfileService } from './profile.service';
import { ITweet } from '../interfaces/ITweet';

const profile = new ProfileService('twitter');
let currentPageTweet: ITweet;
let nextPageTweet: ITweet;

describe('#ProfileService', () => {
  beforeAll(async () => {
    await profile.init();
  });

  it('Should return profile information', () => {
    const profileData = profile.getProfile();
    expect(profileData).toHaveProperty('username');
  });

  it('Should return profile tweets', () => {
    currentPageTweet = profile.getTweets().at(-1) as ITweet;
    expect(currentPageTweet).toHaveProperty('slug');
  });

  it('Should return the next pages of tweets', async () => {
    nextPageTweet = (await profile.getNextPage()).at(-1) as ITweet;
    expect(nextPageTweet.slug).not.toBe(currentPageTweet.slug);
  });
});

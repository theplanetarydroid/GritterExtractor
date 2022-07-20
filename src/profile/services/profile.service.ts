import { IProfile } from '../interfaces/IProfile';
import { ITweet } from '../interfaces/ITweet';
import { ProfileGetter } from '../utils/getters/profile.getter';
import { TweetsGetter } from '../utils/getters/tweets.getter';

export class ProfileService {
  private _profileGetter: ProfileGetter;
  private _tweetsGetter: TweetsGetter;

  constructor(private username: string) {
    this._profileGetter = new ProfileGetter(this.username);
    this._tweetsGetter = new TweetsGetter(this.username);
  }

  async init(): Promise<void> {
    await Promise.allSettled([
      await this._profileGetter.init(),
      await this._tweetsGetter.init(),
    ]);
  }

  getProfile(): IProfile {
    return this._profileGetter.profile();
  }

  getTweets(): ITweet[] {
    return this._tweetsGetter.tweets();
  }

  async getNextPage(): Promise<ITweet[]> {
    return await this._tweetsGetter.nextPage();
  }
}

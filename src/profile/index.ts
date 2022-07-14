import { IProfile } from './interfaces/IProfile';
import { ITweet } from './interfaces/ITweet';
import { ProfileService } from './services/profile.service';

export class Profile {
  private _profileService: ProfileService;

  constructor(private username: string) {
    this._profileService = new ProfileService(this.username);
  }

  async init() {
    await this._profileService.init();
  }

  getProfile(): IProfile {
    return this._profileService.getProfile();
  }

  getTweets(): ITweet[] {
    return this._profileService.getTweets()
  }
}

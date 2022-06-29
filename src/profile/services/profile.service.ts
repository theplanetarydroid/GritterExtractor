import { IProfile } from '../interfaces/IProfile';
import { ProfileGetter } from '../utils/getters/profile.getter';

export class ProfileService {
  private _profileGetter: ProfileGetter

  constructor(private username: string) {
    this._profileGetter = new ProfileGetter(this.username)
  }
  
  async init(): Promise<void> {
    await this._profileGetter.init()
  }

  async getProfile(): Promise<IProfile> {
    return {
      name: this._profileGetter.name,
      username: this._profileGetter.userName,
      userId: this._profileGetter.userId,
      followingCount: this._profileGetter.followingCount,
      followersCount: this._profileGetter.followersCount,
      likesCount: this._profileGetter.likesCount,
      tweetsCount: this._profileGetter.tweetsCount,
      profilePhoto: this._profileGetter.profilePhoto,
      bannerPhoto: this._profileGetter.bannerPhoto,
      location: this._profileGetter.location,
      biography: this._profileGetter.biography,
      website: this._profileGetter.website,
      isVerified: this._profileGetter.isVerified,
    };
  }
}

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

  getProfile(): IProfile {
      return this._profileGetter.profile();
  }
}

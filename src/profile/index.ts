import { IProfile } from './interfaces/IProfile';
import { ProfileService } from './services/profile.service';

export class Profile {
  private _profileService: ProfileService;

  constructor(private username: string) {
    this._profileService = new ProfileService(this.username);
  }

  async init() {
    await this._profileService.init();
  }

  async getProfile(): Promise<IProfile> {
    return await this._profileService.getProfile();
  }
}

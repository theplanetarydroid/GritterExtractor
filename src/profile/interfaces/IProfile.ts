export interface IProfile {
  name: string;
  username: string;
  followingCount: number;
  followersCount: number;
  likesCount: number;
  tweetsCount: number;
  profilePhoto: string;
  bannerPhoto: string;
  location: string | undefined;
  biography: string;
  website: string | undefined;
  isVerified: boolean;
}

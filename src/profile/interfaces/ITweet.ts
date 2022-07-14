export interface ITweet {
  slug: string;
  hasImages: boolean;
  hasVideos: boolean;
  isRetweet: boolean;
  body: string;
  attachements: {
    images: (string | undefined)[];
  };
  date: {
    fullDate: string;
    roundDate: string;
  };
  owner: {
    username: string;
    name: string;
    profilePhoto: string;
  };
}

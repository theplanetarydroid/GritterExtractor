export interface ITweet {
  slug: string;
  hasImages: boolean;
  hasVideos: boolean;
  isRetweet: boolean;
  body: string;
  attachements: {
    images: (string | undefined)[];
  };
  stats: {
    comments: number;
    retweets: number;
    quotes: number;
    likes: number;
  },
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

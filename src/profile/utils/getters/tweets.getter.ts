import { Cheerio, CheerioAPI, Element } from 'cheerio';
import { getContent } from '../../../utils';
import { getInstance } from '../../../utils/useInstance';
import { ITweet } from '../../interfaces/ITweet';

export class TweetsGetter {
  private $!: CheerioAPI;
  private tweet!: Cheerio<Element>;

  constructor(private username: string) {}

  async init(): Promise<void> {
    try {
      this.$ = await getContent(this.username);
    } catch (err: any) {
      console.log(err);
      // throw new Error(err);
    }
  }

  async nextPage(): Promise<ITweet[]> {
    const tokenNext = this.$('.show-more>a:contains("Load more")')
      .attr('href')
      ?.split('=')
      .at(-1);
    this.username = `${this.username}?cursor=${tokenNext}`;
    await this.init();
    return this.tweets().slice(1);
  }

  tweets(): ITweet[] {
    const tweets: ITweet[] = [];

    this.$('.timeline-item')
      .get()
      .map((el) => {
        this.tweet = this.$(el);

        const tweetStruct: ITweet = {
          slug: this.metadata.slug,
          hasImages: this.metadata.hasImages,
          hasVideos: this.metadata.hasVideos,
          isRetweet: this.metadata.isRetweet,
          body: this.content.body,
          attachements: {
            images: this.content.attachements.images,
          },
          date: this.date,
          owner: this.owner,
        };

        tweets.push(tweetStruct);
      });
    return tweets;
  }

  private get content(): {
    body: string;
    attachements: { images: (string | undefined)[] };
  } {
    return {
      body: this.tweet.find('.tweet-content').text().trim(),
      attachements: {
        images: this.tweet
          .find('.still-image')
          .get()
          .map((el) => {
            const img = this.$(el);
            return `${getInstance()}${img.attr('href')}`;
          }),
      },
    };
  }

  private get metadata(): {
    slug: string;
    isRetweet: boolean;
    hasImages: boolean;
    hasVideos: boolean;
  } {
    return {
      slug: this.tweet.find('.tweet-link').attr('href') as unknown as string,
      isRetweet: this.tweet.find('.retweet-header').html() ? true : false,
      hasImages: this.tweet.find('.gallery-row').html() ? true : false,
      hasVideos: this.tweet.find('.gallery-video').html() ? true : false,
    };
  }

  private get date(): { fullDate: string; roundDate: string } {
    return {
      fullDate: this.tweet.find('.tweet-date > a').attr('title') as string,
      roundDate: this.tweet.find('.tweet-date > a').text(),
    };
  }

  private get owner(): {
    username: string;
    name: string;
    profilePhoto: string;
  } {
    return {
      username: this.tweet.find('.username').text(),
      name: this.tweet.find('.fullname').text(),
      profilePhoto: `${getInstance()}${this.tweet
        .find('.avatar')
        .attr('src')}` as string,
    };
  }
}

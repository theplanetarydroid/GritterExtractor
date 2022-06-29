import { CheerioAPI } from 'cheerio';
import { getContent, getUserId } from '../../../utils';

export class ProfileGetter {
  private $!: CheerioAPI;
  public userId!: number;

  constructor(private username: string) {}

  async init(): Promise<void> {
    const [$, userId] = await Promise.all([
      getContent(`https://nitter.net/${this.username}`),
      getUserId(this.username),
    ]);

    this.$ = $;
    this.userId = userId;
  }

  get name(): string {
    return this.$('.profile-card-fullname').text();
  }

  get userName(): string {
    return this.$('.profile-card-username').text();
  }

  get followingCount(): number {
    return Number(
      this.$('.following > span:nth-child(2)').text().split(',').join('')
    );
  }

  get followersCount(): number {
    return Number(
      this.$('.followers > span:nth-child(2)').text().split(',').join('')
    );
  }

  get likesCount(): number {
    return Number(
      this.$('.likes > span:nth-child(2)').text().split(',').join('')
    );
  }

  get tweetsCount(): number {
    return Number(
      this.$('.posts > span:nth-child(2)').text().split(',').join('')
    );
  }

  get profilePhoto(): string {
    return `https://nitter.net${this.$('.profile-card-avatar').attr('href')!}`;
  }

  get bannerPhoto(): string {
    return `https://nitter.net${this.$(
      '.profile-banner > a:nth-child(1) > img:nth-child(1)'
    ).attr('src')}`;
  }

  get location(): string | undefined {
    return this.$('.profile-location > span:nth-child(2)').text() === ''
      ? undefined
      : this.$('.profile-location > span:nth-child(2)').text();
  }

  get biography(): string {
    return this.$('.profile-bio > p').text();
  }

  get website(): string | undefined {
    return this.$('.profile-website > span:nth-child(1) > a:nth-child(2)').attr(
      'href'
    );
  }

  get isVerified(): boolean {
    return this.$(
      '.profile-card-fullname > div:nth-child(1) > span:nth-child(1)'
    ).attr('title') === 'Verified account'
      ? true
      : false;
  }
}

import type { Tweet } from 'twitter.js';

export interface CommandType {
  name: string;
  description?: string;
  execute(tweet: Tweet, words: Array<string>): Promise<void>
}
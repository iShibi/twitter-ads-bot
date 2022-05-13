import type { CommandType } from './command';
import type { Collection, Tweet } from 'twitter.js';

export interface RuleType {
  value: string;
  tag: string;
  description?: string;
  action(tweet: Tweet, commands: Collection<string, CommandType>): Promise<void>;
}
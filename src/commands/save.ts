import { randomUUID } from 'crypto';
import { prisma } from '../index.js';
import { CommandType } from '../typings/command';

export const Command: CommandType = {
  name: 'save',
  description: 'Stores the ad in the database',
  async execute(tweet, words) {
    const pincode = words.shift()!;
    const text = words.join(' ');
    await prisma.ad.create({
      data: {
        id: randomUUID(),
        creatorId: tweet.authorId!,
        creatorName: tweet.author?.username!,
        pincode,
        text,
      }
    });
    tweet.reply({ text: 'Your ad has been saved in the database' });
  }
}
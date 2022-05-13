import { prisma } from '../index.js';
import { CommandType } from '../typings/command';

export const Command: CommandType = {
  name: 'search',
  description: 'Replies with a list of ads having the given pincode',
  async execute(tweet, words) {
    const pincode = words.shift()!;
    const adsList = await prisma.ad.findMany({
      where: { pincode }
    });
    for (const ad of adsList) {
      tweet.reply({ text: `${ad.text} (@${ad.creatorName})` });
    }
  }
}
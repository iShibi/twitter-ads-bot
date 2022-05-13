import type { CommandType } from '../typings/command';

export const Command: CommandType = {
    name: 'ping',
    description: 'Replies with a Pong!',
    async execute(tweet) {
        tweet.reply({ text: 'Pong!' });
    }
}
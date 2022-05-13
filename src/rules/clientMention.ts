import type { RuleType } from '../typings/rule';

export const Rule: RuleType = {
    value: '@tjs_test',
    tag: '@tjs_test',
    description: 'Matches tweets that mention the user tjs_test',
    async action(tweet, commands) {
        const words = tweet.text.split(' ').filter(word => word !== `@${tweet.client.me?.username}`);
        const cmdName = words.shift();
        if (!cmdName) return;
        commands.get(cmdName)?.execute(tweet, words);
    }
}

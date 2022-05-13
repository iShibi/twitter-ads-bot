import { readdirSync } from 'node:fs';
import { credentials } from './secrets.js';
import { Client, Collection } from 'twitter.js';
import type { RuleType } from './typings/rule';
import type { CommandType } from './typings/command';

import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;
export const prisma = new PrismaClient();

const client = new Client({ events: ['FILTERED_TWEET_CREATE'] });

const rules = new Collection<string, RuleType>();
const commands = new Collection<string, CommandType>();

client.on('ready', async () => {
  console.log(`Logged in as ${client.me?.username}`);
  const ruleFiles = readdirSync('./src/rules').filter(file => file.endsWith('.js'));
  for (const file of ruleFiles) {
    const rule = (await import(`./rules/${file}`)).Rule;
    rules.set(rule.tag, rule);
  }
  const existingRuleValues = (await client.filteredStreamRules.fetch()).map(rule => rule.value);
  const newRuleData = rules.filter(rule => !existingRuleValues.includes(rule.value)).map(rule => Object({ value: rule.value, tag: rule.tag }));
  if (newRuleData.length) {
    await client.filteredStreamRules.create(newRuleData);
  }
  const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const cmd = (await import(`./commands/${file}`)).Command;
    commands.set(cmd.name, cmd);
  }
});

client.on('filteredTweetCreate', async (tweet, matchingRules) => {
  // if (tweet.author?.username === client.me?.username) return; // bot's reply trigger this event for some reason
  const ruleTag = matchingRules.first()?.tag;
  if (!ruleTag) return;
  rules.get(ruleTag)?.action(tweet, commands);
});

// @ts-expect-error
client.login(credentials);
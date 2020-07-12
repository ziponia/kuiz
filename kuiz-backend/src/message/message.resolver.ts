import { Resolver, Subscription, Mutation, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import shortid from 'shortid';

import { Message } from './message.model';
import { Logger } from '@nestjs/common';
const pubsub = new PubSub();

@Resolver(of => Message)
export class MessageResolver {
  @Subscription(returns => Message, {
    name: 'messageReceive',
    nullable: true,
  })
  async messageReceive() {
    return pubsub.asyncIterator('messageReceive');
  }

  @Mutation(returns => Message)
  async sendMessage(
    @Args({ name: 'message', type: () => String }) content: string,
  ): Promise<Message> {
    const message = {
      message: content,
      messageId: shortid.generate(),
    };
    pubsub.publish('messageReceive', { messageReceive: message });
    return message;
  }
}

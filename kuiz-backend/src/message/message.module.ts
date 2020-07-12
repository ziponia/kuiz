import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [MessageResolver],
})
export class MessageModule {}

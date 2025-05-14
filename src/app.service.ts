import { getSystemPrompt } from '@/lib/ai/prompt';
import { User } from '@/lib/schemas/user.schema';
import { tools } from '@/lib/tools';
import { openai } from '@ai-sdk/openai';
import { llamaindex } from '@llamaindex/vercel';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CoreTool, Message, streamText } from 'ai';
import { Wallet } from 'ethers';
import { storageContextFromDefaults, VectorStoreIndex } from 'llamaindex';
import { Model } from 'mongoose';
import { createClient, http } from 'viem';
import { mainnet } from 'viem/chains';

@Injectable()
export class AppService implements OnModuleInit {
  logger = new Logger(AppService.name);
  client = createClient({
    chain: mainnet,
    transport: http(),
  });

  private queryTool: CoreTool | null = null;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async chat(messages: Message[], externalWalletAddress: string) {
    try {
      return streamText({
        model: openai('gpt-4o'),
        maxSteps: 10,
        messages,
        tools: {
          ...tools,
          ...(this.queryTool ? { queryTool: this.queryTool } : {}),
        },
        system: getSystemPrompt({
          address: user.address,
          privateKey: user.privateKey,
        }),
      });
    } catch (error) {
      this.logger.error(`Error in chat method: ${error.message}`);
      throw error;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
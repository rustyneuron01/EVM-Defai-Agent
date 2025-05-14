import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { Message, pipeDataStreamToResponse } from 'ai';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(200)
  @Post('chat')
  chat(
    @Body() body: { messages: Message[]; address: string },
    @Res() res: Response,
  ) {
    pipeDataStreamToResponse(res, {
      execute: async (writer) => {
        const stream = await this.appService.chat(body.messages, body.address);
        return stream.mergeIntoDataStream(writer);
      },
    });
  }
}

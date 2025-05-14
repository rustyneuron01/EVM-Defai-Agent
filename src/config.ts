import { IsString } from 'class-validator';
import { ethers } from 'ethers';
import {
  dotenvLoader,
  selectConfig,
  TypedConfigModule,
} from 'nest-typed-config';
import { Logger } from '@nestjs/common';

export class Config {
  @IsString()
  public readonly DATABASE_URL: string;

  @IsString()
  public readonly COINGECKO_API_KEY: string;

  @IsString()
  public readonly OPENAI_API_KEY: string;

  @IsString()
  public readonly ALCHEMY_API_KEY: string;

  @IsString()
  public readonly RPC_URL: string;
}

export const ConfigModule = TypedConfigModule.forRoot({
  schema: Config,
  load: dotenvLoader(),
});

export const config = selectConfig(ConfigModule, Config);

export const ethersProvider = new ethers.JsonRpcProvider(config.RPC_URL);
export const logger = new Logger();

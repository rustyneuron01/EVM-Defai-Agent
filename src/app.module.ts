import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dotenvLoader, TypedConfigModule } from 'nest-typed-config';
import { config, Config } from '@/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/lib/schemas/user.schema';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: Config,
      load: dotenvLoader(),
    }),
    MongooseModule.forRoot(config.DATABASE_URL, {
      connectionFactory: (connection) => {
        connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
        });
        connection.on('disconnected', () => {
          console.warn('MongoDB disconnected');
        });
        return connection;
      }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

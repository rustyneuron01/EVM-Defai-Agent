import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class UserWallet {
  @Prop({ required: true })
  externalWalletAddress: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

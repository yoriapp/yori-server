import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserLibraryDocument = UserLibrary & Document;

@Schema()
export class UserLibrary {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  mangaId: string;

  @Prop({ required: true, enum: ['completed', 'reading', 'abandoned'] })
  status: string;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export const UserLibrarySchema = SchemaFactory.createForClass(UserLibrary);

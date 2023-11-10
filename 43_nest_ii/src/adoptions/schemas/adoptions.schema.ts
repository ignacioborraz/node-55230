import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Pet } from 'src/pets/schemas/pets.schema';
import { User } from 'src/users/schemas/users.schema';

export type AdoptionsDocument = HydratedDocument<Adoption>;

@Schema()
export class Adoption {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Pet' })
  pet: Pet;
}

export const AdoptionsSchema = SchemaFactory.createForClass(Adoption);

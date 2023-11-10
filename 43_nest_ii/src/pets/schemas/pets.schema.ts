import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PetsDocument = HydratedDocument<Pet>

@Schema()
export class Pet {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  specie: string

  @Prop({ default: false })
  adopted: boolean

  @Prop({ default: new Date()})
  birthDate: Date

  @Prop({ default: "https://nodesk.co/remote-companies/assets/logos/adopt-me.389c47d61e491ee8c73728da7fea38f55ecb62e9685b7a14bc33f149af313e74.png" })
  image: string
}

export const PetsSchema = SchemaFactory.createForClass(Pet)
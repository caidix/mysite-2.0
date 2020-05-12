import { prop } from "@typegoose/typegoose";

export class Episode {
  @prop()
  name: string

  @prop()
  file: string
}
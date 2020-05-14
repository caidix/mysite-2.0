import { prop, modelOptions, Ref, mongoose } from "@typegoose/typegoose";
import { Course } from "./course.model";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Episode {
  @prop()
  name: string

  @prop()
  file: string

  @prop({ ref: 'Course', refType: mongoose.Schema.Types.ObjectId })
  course: Ref<Course>

}
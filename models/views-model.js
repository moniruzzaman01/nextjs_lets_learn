import mongoose, { Schema } from "mongoose";
import { User } from "./user-model";
import { Lesson } from "./lesson-model";
import { Module } from "./module-model";

const viewsSchema = new Schema(
  {
    state: {
      type: String,
      default: "",
    },
    user: {
      type: Schema.ObjectId,
      ref: User,
      required: true,
    },
    lesson: {
      type: Schema.ObjectId,
      ref: Lesson,
      required: true,
    },
    module: {
      type: Schema.ObjectId,
      ref: Module,
      required: true,
    },
    lastTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const View = mongoose.models.View ?? mongoose.model("View", viewsSchema);

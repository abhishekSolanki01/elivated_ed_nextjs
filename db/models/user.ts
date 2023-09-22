import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'course'}]//, unique: true}]
  })

export const User = mongoose.models.user || model('user', userSchema)


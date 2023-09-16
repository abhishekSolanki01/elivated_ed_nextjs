import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const model = mongoose.model;

const adminSchema = new Schema({
    username: String,
    password: String
  })
export default mongoose.models.admin || model('admin', adminSchema)
  
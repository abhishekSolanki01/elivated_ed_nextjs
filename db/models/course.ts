import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const model = mongoose.model;

const courseSchema = new Schema({
    title : String, 
    description: String, 
    price: Number, 
    imageLink: String, 
    published: Boolean,
    summary: Array,
  })

export  const Course = model('course', courseSchema)


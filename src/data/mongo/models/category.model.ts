import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema( {

  name: {
    type: String,
    required: [ true, 'Name is required' ],
    unique: true
  },
  available: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
} );

categorySchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options ) {
    delete ret._id;
  }
} );

export const CategoryModel = mongoose.model( 'Category', categorySchema );
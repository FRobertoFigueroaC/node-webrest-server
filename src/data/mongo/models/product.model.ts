import mongoose from 'mongoose';


const productSchema = new mongoose.Schema( {

  name: {
    type: String,
    unique: true,
    required: [ true, 'Name is required' ],
  },
  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
} );

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options){
    delete ret._id;
    delete ret.password;
  }
});

export const ProductModel = mongoose.model( 'Product', productSchema );
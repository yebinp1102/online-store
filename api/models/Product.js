import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    maxlength: 50
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  images: {
    type: Array,
    default: []
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0
  },
  continents: {
    type: Number,
    default: 1
  },
  views: {
    type: Number,
    default: 0
  }
}, {timestamps: true})

productSchema.index({
  title: 'text',
  description: 'text'
},{
  weights: {
    title: 5,
    description: 1
  }
})

export default mongoose.model('Product', productSchema)
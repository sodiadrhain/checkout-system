import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Interface
interface IProduct {
  productCode: string;
  name: string;
  price: number;
}

// Schema
const productSchema = new Schema<IProduct>({
  productCode: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model('Product', productSchema);

import CheckoutService from '../src/service/CheckoutService';
import { connectDb, closeDb, clearDb } from './db-config';
import { products } from './data/products';
import Product from '../src/model/Product';

describe('CheckoutService', () => {
  let co;
  const pricingRules = {
    '002': ['itemDiscount', 2, 3.99],
    orderDiscount: ['percentOff', 30, 10],
  };

  beforeEach(async () => {
    co = new CheckoutService(pricingRules);
    await connectDb().then(async () => {
      // seed db with products
      //TODO: uncomment the line below when Product model is imported
      // await Product.insertMany(products);
      await Product.insertMany(products);
    });
  });

  afterEach(async () => {
    await clearDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  it('should calculate total cart price as 29.65', () => {
    co.scan('001');
    co.scan('002');
    co.scan('003');
    const res = co.total();
    expect(29.65).toEqual(res);
  });

  it('should calculate total cart price as 9.93', () => {
    co.scan('002');
    co.scan('001');
    co.scan('002');
    const res = co.total();
    expect(9.93).toEqual(res);
  });

  it.only('should calculate total cart price as 31.44', () => {
    co.scan('002');
    co.scan('001');
    co.scan('002');
    co.scan('003');
    const res = co.total();
    expect(31.44).toEqual(res);
  });
});

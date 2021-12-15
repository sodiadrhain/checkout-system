import CheckoutService from '../src/service/CheckoutService';

describe('CheckoutService', () => {
  let co;
  const pricingRules = {
    '002': ['itemDiscount', 2, 3.99],
    orderDiscount: ['percentOff', 30, 10],
  };

  beforeEach(() => {
    co = new CheckoutService(pricingRules);
  });

  it('should scan item', () => {
    co.scan('001');
    co.scan('002');
    co.scan('003');

    // fetch cart item count and assert that it matches number of item inserted
  });

  it('should calculate total cart price as 29.65', () => {
    co.scan('001');
    co.scan('002');
    co.scan('003');
    const res = co.total();
    expect('29.65').toEqual(res);
  });
});

import Product from '../model/Product';
export default class CheckoutService {
  private readonly pricingRules;

  constructor(pricingRules) {
    this.pricingRules = pricingRules;
  }

  private products = [
    {
      productCode: '001',
      name: 'Curry Sauce',
      price: 1.95,
    },
    {
      productCode: '002',
      name: 'Pizza',
      price: 5.99,
    },
    {
      productCode: '003',
      name: 'Men’s T-Shirt',
      price: 25.0,
    },
  ];

  private cart = [];

  private order = [
    {
      productCode: '001',
      name: 'Curry Sauce',
      price: 1.95,
      quantity: 1,
    },
    {
      productCode: '002',
      name: 'Pizza',
      price: 5.99,
      quantity: 1,
    },
    {
      productCode: '003',
      name: 'Men’s T-Shirt',
      price: 25.0,
      quantity: 1,
    },
  ];
  private order2 = [
    {
      productCode: '001',
      name: 'Curry Sauce',
      price: 1.95,
      quantity: 1,
    },
    {
      productCode: '002',
      name: 'Pizza',
      price: 5.99,
      quantity: 2,
    },
  ];
  private order3 = [
    {
      productCode: '001',
      name: 'Curry Sauce',
      price: 1.95,
      quantity: 1,
    },
    {
      productCode: '002',
      name: 'Pizza',
      price: 5.99,
      quantity: 2,
    },
    {
      productCode: '003',
      name: 'Men’s T-Shirt',
      price: 25.0,
      quantity: 1,
    },
  ];

  public scan(item: string) {
    // TODO: query db for item on products collection
    const product = Product.findOne({ productCode: item }).exec();
    // const product = this.products.find((prod) => {
    //   return prod.productCode === item;
    // });

    if (product) {
      this.cart.push(product);
      //TODO insert product code & quantity into carts table  ---- default quantity can be set to 1 on Cart schema
    }
  }

  public total() {
    let sum = 0;
    //TODO query carts table and join products on carts.product_id = products.id, group by products.productCode,
    // products.price, select -- products.productCode, products.price, sum(carts.quantity) as quantity
    this.order3.forEach((product) => {
      const rule = this.pricingRules[`${product.productCode}`];
      if (rule) {
        sum += parseFloat(this[rule[0]](product, rule[1], rule[2]));
      } else {
        sum += product.quantity * product.price;
      }
      return sum;
    });

    const orderDiscountRule = this.pricingRules['orderDiscount'];
    return parseFloat(this[orderDiscountRule[0]](sum, orderDiscountRule[1], orderDiscountRule[2]));
  }

  private percentOff(sum, discountableSum, percent) {
    if (parseFloat(sum) > discountableSum) {
      sum = sum - (percent / 100) * sum;
    }

    return sum.toFixed(2);
  }

  private itemDiscount(product, discountableQty, price) {
    if (product.quantity < discountableQty) {
      price = product.price;
    }

    return product.quantity * price;
  }
}

class CheckoutService {
  private pricingRules;
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
  }

  private products = [
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

  private cart = [];

  private order = [];

  scan(item: string) {
    const product = this.products.find((product) => {
      return product.productCode === item;
    });

    if (product) {
      this.cart.push(product.productCode);
      this.order.push(product);
    }
  }

  total() {
    let sum = 0;
    this.order.forEach((product) => {
      const rule = this.pricingRules[`${product.productCode}`];
      //   if (rule) {
      //     sum += parseFloat(`this.${rule[0]}(${product.productCode}, ${rule[1]}, ${rule[2]})`);
      //     console.log(`this,${rule[0]}(${product.productCode}, ${rule[1]}, ${rule[2]})`);
      //   } else {
      //     sum += product.quantity * product.price;
      //   }

      if (rule && rule[0] === 'itemDiscount') {
        sum += this.itemDiscount(product, rule[1], rule[2]);
      } else {
        sum += product.quantity * product.price;
      }
      return sum;
    });
    // sum product qty for the same productCode and add it to product object
    // total = qty * price ----- for the same productCode

    const rule2 = this.pricingRules['orderDiscount'];

    if (rule2 && rule2[0] === 'percentOff') {
      sum = this.percentOff(sum, rule2[1], rule2[2]);
    }
    // return parseFloat(`${this}.${rule2[0]}(${sum}, ${rule2[1]}, ${rule2[2]})`);

    return sum;
  }

  percentOff(sum, discountableSum, percent) {
    if (parseFloat(sum) > discountableSum) {
      sum = sum - (percent / 100) * sum;
    }

    return sum.toFixed(2);
  }

  itemDiscount(productQty, qty, price) {
    if (qty < 2) {
      price = 5.99;
    }

    return productQty * price;
  }
}

export default CheckoutService;

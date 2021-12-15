class Checkout {
  private name: string;
  private address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }

  //   constructor(age: number, matric: number) {

  //   }

  /**
   * getName
   */
  public sendUser(): string {
    return `${this.name}, ${this.address}`;
  }
}

export default Checkout;

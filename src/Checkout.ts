import { items } from "./data/items";
export class Checkout {
  cart = [];

  scan(itemSKU: string): boolean {
    const result = items.filter(item => item.sku === itemSKU);
    if (result.length) {
      this.cart.push(result[0]);
      return true;
    }
    return false;
  }
}

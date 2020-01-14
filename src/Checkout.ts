import { items } from "./data/items";
import { Item } from "./data/item";

export class CheckoutService {
  cart: Item[] = [];

  scan(itemSKU: string): boolean {
    const result = items.filter(item => item.sku === itemSKU);
    if (result.length) {
      this.cart.push(result[0]);
      return true;
    }
    return false;
  }

  getTotal(): number {
    let total = 0;
    this.cart.forEach(item => {
      total += item.price;
    });
    return total;
  }
}

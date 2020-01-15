import { items } from "./data/items";
import { Item } from "./data/item";

export class CheckoutService {
  cart: Item[] = [];

  scan(itemSKU: string): boolean {
    const scannedItem = this.findItem(itemSKU);
    if (!scannedItem) {
      return false;
    }
    this.addItemToCart(scannedItem);
    if (scannedItem.offerCode) {
      this.applyDiscount(scannedItem);
    }
    return true;
  }

  private addItemToCart(scannedItem) {
    this.cart.push(scannedItem);
  }

  private findItem(itemSKU) {
    const item = items.filter(item => item.sku === itemSKU);
    if (item.length) {
      return item[0];
    }
    return null;
  }

  applyDiscount(scannedItem: Item) {
    switch (scannedItem.offerCode) {
      case "3for2":
        break;
      case "bulk-discount":
        break;
      case "freeVGAAdapter":
        break;
    }
  }

  getTotal(): number {
    let total = 0;
    this.cart.forEach(item => {
      total += item.price;
    });
    return total;
  }

  checkout(): boolean {
    if (this.cart.length) {
      this.cart = []; // Make the cart empty
      return true;
    }
    return false;
  }
}

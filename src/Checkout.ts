import { items } from "./data/items";
import { Item } from "./data/item";

export class CheckoutService {
  cartItems: Item[] = [];

  scan(itemSKU: string): boolean {
    const scannedItem: Item = this.findItem(itemSKU);
    if (!scannedItem) {
      return false;
    }
    this.addItemToCart(scannedItem);
    if (scannedItem.offerCode) {
      this.applyDiscount(scannedItem);
    }
    return true;
  }

  private addItemToCart(scannedItem: Item) {
    let itemAlreadyExistInCart = false;
    this.cartItems.forEach(cartItem => {
      if (cartItem.sku === scannedItem.sku) {
        // Case: Item already exist in the cart
        itemAlreadyExistInCart = true;
        cartItem.quantity++;
        return;
      }
    });
    // Case: Item does NOT exist in the cart
    if (!itemAlreadyExistInCart) {
      scannedItem.quantity = 1;
      this.cartItems.push(scannedItem);
    }
  }

  private findItem(itemSKU) {
    const item = items.filter(item => item.sku === itemSKU);
    if (item.length) {
      return item[0];
    }
    return null;
  }

  applyDiscount(scannedItem: Item) {
    this.cartItems.forEach(cartItem => {
      if (cartItem.offerCode === "bulk-discount" && cartItem.quantity > 4) {
        cartItem.price = 499.99;
      }
    });
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  checkout(): boolean {
    if (this.cartItems.length) {
      this.cartItems = []; // Make the cart empty
      return true;
    }
    return false;
  }
}

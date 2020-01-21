import { items } from "./data/items";
import { Item, ItemSKU } from "./data/item.interface";

export class Cart {
  cartItems: Item[] = [];

  isEligibleForFreeItem = false; // Free VGA

  scan(itemSKU: ItemSKU): boolean {
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

  findItem(itemSKU) {
    const item = items.filter(item => item.sku === itemSKU);
    if (item.length) {
      return item[0];
    }
    return null;
  }

  private applyDiscount(scannedItem: Item) {
    this.cartItems.forEach(cartItem => {
      switch (scannedItem.offerCode) {
        case "bulk-discount":
          if (cartItem.quantity > 4) {
            cartItem.price = scannedItem.discountPrice;
          }
          break;
        case "freeItem":
          const freeItem = this.findItem(scannedItem.freeItemSKU);
          this.addItemToCart(freeItem);
          break;
        case "3for2":
          if (this.isEligibleForFreeItem) {
            this.addItemToCart(scannedItem);
          }
          this.isEligibleForFreeItem = !this.isEligibleForFreeItem;
          break;
      }
    });
  }

  findCartItem(itemSKU): Item {
    const cartItem = this.cartItems.filter(item => item.sku === itemSKU);
    if (cartItem.length) {
      return cartItem[0];
    }
    return null;
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

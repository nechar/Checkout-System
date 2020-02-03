import { iItem, ItemSKU } from "./model/item.interface";

import { ItemCollection } from "./ItemCollection";
const itemCollection = new ItemCollection();

export class Cart {
  cartItems: iItem[] = [];

  scan(itemSKU: ItemSKU): iItem {
    const scannedItem: iItem = itemCollection.findItem(itemSKU);
    if (!scannedItem) {
      throw new Error(`Could not find the item: ${itemSKU}`);
    }
    const newCartItem: iItem = this.addItemToCart(scannedItem);

    if (scannedItem.offerCode === "freeItem") {
      const freeItem = itemCollection.findItem(scannedItem.freeItemSKU);
      if (freeItem) {
        // Adding a free VGA into the cart
        this.addItemToCart(freeItem);
      }
    }
    if (scannedItem.offerCode === "3for2") {
      if (this.check3for2Eligibility(newCartItem)) {
        this.addItemToCart(scannedItem);
      }
    }
    return scannedItem;
  }

  findItem(itemSKU: ItemSKU): iItem {
    const cartItem = this.cartItems.filter(item => item.sku === itemSKU);
    if (cartItem.length) {
      return cartItem[0];
    }
    return null;
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(cartItem => {
      if (cartItem.offerCode === "bulk-discount" && cartItem.quantity > 4) {
        total += cartItem.discountPrice * cartItem.quantity;
      } else {
        total += cartItem.price * cartItem.quantity;
      }
    });
    return total;
  }

  private check3for2Eligibility(newCartItem: iItem): boolean {
    // Every (3rd - 1)th items are eligible for a `3 for 2` offer.
    // Eg: 2nd, 5th, 8th, 11th and so on.
    return (newCartItem.quantity + 1) % 3 === 0;
  }

  private addItemToCart(scannedItem: iItem): iItem {
    let existingItem = null;
    this.cartItems.forEach(cartItem => {
      if (cartItem.sku === scannedItem.sku) {
        // Case: Item already exist in the cart
        cartItem.quantity++;
        existingItem = cartItem;
        return existingItem;
      }
    });
    // Case: Item does NOT exist in the cart
    if (!existingItem) {
      const newCartItem = { ...scannedItem, quantity: 1 };
      this.cartItems.push(newCartItem);
      return newCartItem;
    } else {
      return existingItem;
    }
  }
}

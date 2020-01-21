import { Item, ItemSKU } from "./data/item.interface";

import { ItemController } from "./Item";
const itemController = new ItemController();

export class Cart {
  cartItems: Item[] = [];

  scan(itemSKU: ItemSKU): Item {
    const scannedItem: Item = itemController.findItem(itemSKU);
    if (!scannedItem) {
      throw new Error(`Could not find the item: ${itemSKU}`);
    }
    const newCartItem: Item = this.addItemToCart(scannedItem);

    if (scannedItem.offerCode === "freeItem") {
      // Adding a free VGA into the cart
      const freeItem = itemController.findItem(scannedItem.freeItemSKU);
      this.addItemToCart(freeItem);
    }
    if (
      scannedItem.offerCode === "3for2" &&
      (newCartItem.quantity + 1) % 3 === 0
    ) {
      // Adding an extra item for every (3rd-1)th item into the cart
      this.addItemToCart(scannedItem);
    }
    return scannedItem;
  }

  private addItemToCart(scannedItem: Item): Item {
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

  findItem(itemSKU: ItemSKU): Item {
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
}

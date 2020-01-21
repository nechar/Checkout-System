import { Item, ItemSKU } from "./data/item.interface";
import { ItemController } from "./Item";

export class Cart {
  cartItems: Item[] = [];

  isEligibleForFreeItem = false;

  itemController = new ItemController();

  scan(itemSKU: ItemSKU): Item {
    const scannedItem: Item = this.itemController.findItem(itemSKU);
    if (!scannedItem) {
      throw new Error(`Could not find the item: ${itemSKU}`);
    }
    const newCartItem: Item = this.addItemToCart(scannedItem);

    if (scannedItem.offerCode === "freeItem") {
      this.addFreeItem(scannedItem);
    }

    if (scannedItem.offerCode === "3for2") {
      this.addExtraItem(scannedItem, newCartItem);
    }
    return scannedItem;
  }

  private addFreeItem(scannedItem) {
    const freeItem = this.itemController.findItem(scannedItem.freeItemSKU);
    this.addItemToCart(freeItem);
  }

  private addExtraItem(scannedItem, newCartItem) {
    if (this.isEligibleForFreeItem) {
      this.addItemToCart(scannedItem);
    }
    this.isEligibleForFreeItem = !this.isEligibleForFreeItem;
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

  findCartItem(itemSKU: ItemSKU): Item {
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

  checkout(): boolean {
    if (this.cartItems.length) {
      this.cartItems = []; // Make the cart empty
      return true;
    }
    throw new Error("Cannot checkout when the cart is empty");
  }
}

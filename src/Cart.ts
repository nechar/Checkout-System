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
    this.addItemToCart(scannedItem);

    if (scannedItem.offerCode) {
      this.applyDiscount(scannedItem);
    }
    return scannedItem;
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

  private applyDiscount(scannedItem: Item) {
    switch (scannedItem.offerCode) {
      case "freeItem":
        const freeItem = this.itemController.findItem(scannedItem.freeItemSKU);
        this.addItemToCart(freeItem);
        break;
      case "3for2":
        if (this.isEligibleForFreeItem) {
          this.addItemToCart(scannedItem);
        }
        this.isEligibleForFreeItem = !this.isEligibleForFreeItem;
        break;
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
    this.cartItems.forEach(item => {
      if (item.offerCode === "bulk-discount" && item.quantity > 4) {
        total += item.discountPrice * item.quantity;
      } else {
        total += item.price * item.quantity;
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

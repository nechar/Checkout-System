import { items } from "./data/items";
import { Item, ItemSKU } from "./data/item.interface";

export class ItemController {
  findItem(itemSKU) {
    const item = items.filter(item => item.sku === itemSKU);
    if (item.length) {
      return item[0];
    }
    return null;
  }
}

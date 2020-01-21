import { sampleItems } from "./data/sample-items";
import { Item, ItemSKU } from "./model/item.interface";

export class ItemController {
  items: Item[] = sampleItems;

  findItem(itemSKU: ItemSKU): Item {
    const item = this.items.filter(item => item.sku === itemSKU);
    if (item.length) {
      return item[0];
    }
    return null;
  }
}

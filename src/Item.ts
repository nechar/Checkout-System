import { sampleItems } from "./data/sample-items";
import { iItem, ItemSKU } from "./model/item.interface";

export class ItemCollection {
  items: iItem[] = sampleItems;

  findItem(itemSKU: ItemSKU): iItem {
    const item = this.items.filter(item => item.sku === itemSKU);
    if (item.length) {
      return item[0];
    }
    return null;
  }
}

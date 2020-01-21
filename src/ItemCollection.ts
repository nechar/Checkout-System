import { itemList } from "./data/item-list";
import { iItem, ItemSKU } from "./model/item.interface";

export class ItemCollection {
  items: iItem[] = itemList;

  findItem(itemSKU: ItemSKU): iItem {
    const item = this.items.filter(item => item.sku === itemSKU);
    if (item.length) {
      return item[0];
    }
    return null;
    /**
     * Why did I use filter instead of find?
     * Because for some reason, jest was unable to recognize find method
     * Ideally I would have used the following if it worked
     * return this.items.find(item => item.sku === itemSKU)
     */
  }
}

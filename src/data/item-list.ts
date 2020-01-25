import { iItem } from "../model/item.interface";

export const itemList: iItem[] = [
  {
    sku: "ipd",
    name: "Super iPad",
    price: 549.99,
    offerCode: "bulk-discount",
    discountPrice: 499.99
  },
  {
    sku: "mbp",
    name: "MacBook Pro",
    price: 1399.99,
    offerCode: "freeItem",
    freeItemSKU: "vga"
  },
  {
    sku: "atv",
    name: "Apple TV",
    price: 109.5,
    offerCode: "3for2"
  },
  {
    sku: "vga",
    name: "VGA adapter",
    price: 30.0,
    offerCode: null
  }
];

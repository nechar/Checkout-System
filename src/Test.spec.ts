import { Cart } from "./Cart";
import { ItemSKU } from "./data/item.interface";

test("should be able to scan an existing item- Eg: Super iPad", () => {
  const cart = new Cart();
  expect(cart.scan(ItemSKU.ipd)).toBeTruthy();
});

test("should be able to scan multiple items", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.ipd);
  expect(cart.scan(ItemSKU.ipd)).toBeTruthy();
});

test("when an item is added into the cart, the total should be greater than zero", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.ipd);
  const total = cart.getTotal();
  expect(total).toBeGreaterThan(0);
});

test("should NOT be able checkout without adding an item", () => {
  const cart = new Cart();
  expect(cart.checkout()).toBeFalsy();
});

test("should be able checkout after adding at least one item", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.ipd);
  expect(cart.checkout()).toBeTruthy();
});

test("should be able checkout after adding at multiple item", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.ipd);
  cart.scan(ItemSKU.ipd);
  expect(cart.checkout()).toBeTruthy();
});

test("Scanning Super iPad should cost 1099.98", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.ipd);
  cart.scan(ItemSKU.ipd);
  const item = cart.findItem(ItemSKU.ipd);
  const total = cart.getTotal();
  expect(total).toBe(item.price * 2); // $1099.98
});

test("Scanning FIVE Super iPad should automatically apply a discount. Total cost should be 2499.95", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.ipd);
  cart.scan(ItemSKU.ipd);
  cart.scan(ItemSKU.ipd);
  cart.scan(ItemSKU.ipd);
  cart.scan(ItemSKU.ipd);
  const item = cart.findItem(ItemSKU.ipd);
  const total = cart.getTotal();
  expect(total).toBe(2499.95);
});

test("Scanning a Mac Book pro should automatically add an item - VGA adapter", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.mbp);
  expect(cart.findCartItem(ItemSKU.vga)).toBeTruthy();
});

test("Scanning an Apple TV should result in having only 1 apple TV on the cart", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.atv);
  expect(cart.findCartItem(ItemSKU.atv).quantity === 1).toBeTruthy();
});

test("Scanning TWO apple TV should have THREE apple TVs on the cart", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.atv);
  cart.scan(ItemSKU.atv);
  expect(cart.findCartItem(ItemSKU.atv).quantity === 3).toBeTruthy();
});

test("Scanning THREE apple TV should have FOUR apple TVs on the cart", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.atv);
  cart.scan(ItemSKU.atv);
  cart.scan(ItemSKU.atv);
  expect(cart.findCartItem(ItemSKU.atv).quantity === 4).toBeTruthy();
});

test("Scanning FOUR apple TV should have SIX apple TVs on the cart", () => {
  const cart = new Cart();
  cart.scan(ItemSKU.atv);
  cart.scan(ItemSKU.atv);
  cart.scan(ItemSKU.atv);
  cart.scan(ItemSKU.atv);
  expect(cart.findCartItem(ItemSKU.atv).quantity === 6).toBeTruthy();
});

import { Cart } from "./Cart";
import { ItemCollection } from "./ItemCollection";

test("should be able to scan an existing item- Eg: Super iPad", () => {
  const cart = new Cart();
  expect(cart.scan("ipd")).toBeTruthy();
});

test("should be able to scan multiple items", () => {
  const cart = new Cart();
  cart.scan("ipd");
  expect(cart.scan("ipd")).toBeTruthy();
});

test("when an item is added into the cart, the total should be greater than zero", () => {
  const cart = new Cart();
  cart.scan("ipd");
  const total = cart.getTotal();
  expect(total).toBeGreaterThan(0);
});

test("Scanning Super iPad should cost 1099.98", () => {
  const cart = new Cart();
  const itemCollection = new ItemCollection();
  cart.scan("ipd");
  cart.scan("ipd");
  const item = itemCollection.findItem("ipd");
  const total = cart.getTotal();
  expect(total).toBe(1099.98);
});

test("Scanning FIVE Super iPad should automatically apply a discount. Total cost should be 2499.95", () => {
  const cart = new Cart();
  const itemCollection = new ItemCollection();
  cart.scan("ipd");
  cart.scan("ipd");
  cart.scan("ipd");
  cart.scan("ipd");
  cart.scan("ipd");
  const item = itemCollection.findItem("ipd");
  const total = cart.getTotal();
  expect(total).toBe(2499.95);
});

test("Scanning a Mac Book pro should automatically add an item - VGA adapter", () => {
  const cart = new Cart();
  cart.scan("mbp");
  expect(cart.findItem("vga")).toBeTruthy();
});

test("Scanning an Apple TV should result in having only 1 apple TV on the cart", () => {
  const cart = new Cart();
  cart.scan("atv");
  expect(cart.findItem("atv").quantity === 1).toBeTruthy();
});

test("Scanning TWO apple TV should have THREE apple TVs on the cart", () => {
  const cart = new Cart();
  cart.scan("atv");
  cart.scan("atv");
  expect(cart.findItem("atv").quantity === 3).toBeTruthy();
});

test("Scanning THREE apple TV should have FOUR apple TVs on the cart", () => {
  const cart = new Cart();
  cart.scan("atv");
  cart.scan("atv");
  cart.scan("atv");
  expect(cart.findItem("atv").quantity === 4).toBeTruthy();
});

test("Scanning FOUR apple TV should have SIX apple TVs on the cart", () => {
  const cart = new Cart();
  cart.scan("atv");
  cart.scan("atv");
  cart.scan("atv");
  cart.scan("atv");
  expect(cart.findItem("atv").quantity === 6).toBeTruthy();
});

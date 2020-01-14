import { CheckoutService } from "./Checkout";

test("should be able to scan an existing item- Eg: Super iPad", () => {
  const checkout = new CheckoutService();
  expect(checkout.scan("ipd")).toBeTruthy();
});

test("when an item is added into the cart, the total should be greater than zero", () => {
  const checkout = new CheckoutService();
  checkout.scan("ipd");
  const total = checkout.total();
  expect(total).toBeGreaterThan(0);
});

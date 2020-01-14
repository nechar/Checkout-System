import { Checkout } from "./Checkout";

test("should be able to scan an existing item- Eg: Super iPad", () => {
  const checkout = new Checkout();
  expect(checkout.scan("ipd")).toBeTruthy();
});

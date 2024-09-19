import fs from "fs";
import path from "path";

import { readOrders, readPrices } from "../src/services/fileReader";

jest.mock("fs");

describe("FileReader", () => {
  const mockOrders = JSON.stringify({
    orders: [{ customerId: 1, sku: "balloon", credits: 50 }],
  });

  const mockPrices = JSON.stringify({
    balloon: 5,
    stuffedanimal: 10,
    crayon: 3,
  });

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReset();
  });

  test("readOrders should return parsed order data", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(mockOrders);

    const orders = readOrders();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.resolve(__dirname, "../data/orders.json"),
      "utf8"
    );
    expect(orders).toEqual([{ customerId: 1, sku: "balloon", credits: 50 }]);
  });

  test("readPrices should return parsed price data", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(mockPrices);

    const prices = readPrices();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.resolve(__dirname, "../data/prices.json"),
      "utf8"
    );
    expect(prices).toEqual({ balloon: 5, stuffedanimal: 10, crayon: 3 });
  });

  test("readOrders should throw an error if file reading fails", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => readOrders()).toThrow("Failed to read or parse orders.json");
  });

  test("readPrices should throw an error if file reading fails", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => readPrices()).toThrow("Failed to read or parse prices.json");
  });
});

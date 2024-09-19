import fs from "fs";
import path from "path";
import { Order, PriceList } from "../models";

export const readOrders = (filePath: string): Order[] => {
  try {
    const data = fs.readFileSync(path.resolve(filePath), "utf8");
    const parsedData = JSON.parse(data);

    return parsedData.orders as Order[];
  } catch (error) {
    throw new Error(
      `Failed to read or parse ${filePath}, with this error: ${error}`
    );
  }
};

export const readPrices = (filePath: string): PriceList => {
  try {
    const data = fs.readFileSync(path.resolve(filePath), "utf8");
    return JSON.parse(data) as PriceList;
  } catch (error) {
    throw new Error(
      `Failed to read or parse ${filePath}, with this error: ${error}`
    );
  }
};

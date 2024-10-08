import { Order, PriceList, PurchaseSummary, Shipment, SKU } from "../models";
import { getPerkStrategy } from "../strategies/perkFactory";

export const processOrder = (
  order: Order,
  prices: PriceList
): PurchaseSummary => {
  const { customerId, sku, credits } = order;

  if (!isValidSKU(sku)) {
    throw new Error(`Invalid SKU: ${sku}`);
  }

  let unitPrice = prices[sku];

  const { adjustedUnitPrice, bonusItems } = applyPerks(
    order,
    sku,
    unitPrice,
    prices
  );

  const quantity = Math.floor(credits / adjustedUnitPrice);
  const remainingCredits = credits - quantity * adjustedUnitPrice;
  const shipments: Shipment[] = [{ sku, quantity }, ...bonusItems].filter(
    (item) => item.quantity > 0
  );

  return {
    customerId,
    shipment: shipments,
    remainingCredits,
  };
};

const applyPerks = (
  order: Order,
  sku: SKU,
  unitPrice: number,
  prices: PriceList
): { adjustedUnitPrice: number; bonusItems: Shipment[] } => {
  const perkStrategies = getPerkStrategy(sku);
  let adjustedUnitPrice = unitPrice;
  let bonusItems: Shipment[] = [];

  for (const strategy of perkStrategies) {
    const result = strategy.award(order, adjustedUnitPrice, prices);
    adjustedUnitPrice = result.adjustedUnitPrice;
    bonusItems = bonusItems.concat(result.bonusItems);
  }

  return { adjustedUnitPrice, bonusItems };
};

const isValidSKU = (sku: string): sku is SKU => {
  return Object.values(SKU).includes(sku as SKU);
};

import { Order, Shipment, SKU } from "../models";

export interface PerkStrategy {
  award(
    order: Order,
    unitPrice: number,
    prices: Record<string, number>
  ): {
    adjustedUnitPrice: number;
    bonusItems: Shipment[];
  };
}

export class FiveStuffedAnimalBonus implements PerkStrategy {
  award(
    order: Order,
    unitPrice: number
  ): { adjustedUnitPrice: number; bonusItems: Shipment[] } {
    const quantity = Math.floor(order.credits / unitPrice);
    const bonusQuantity = Math.floor(quantity / 5);
    const bonusItems: Shipment[] = [];

    if (bonusQuantity > 0) {
      bonusItems.push({ sku: SKU.StuffedAnimal, quantity: bonusQuantity });
    }

    return {
      adjustedUnitPrice: unitPrice,
      bonusItems,
    };
  }
}

export class TwoCrayonBoxBonus implements PerkStrategy {
  award(
    order: Order,
    unitPrice: number
  ): { adjustedUnitPrice: number; bonusItems: Shipment[] } {
    const quantity = Math.floor(order.credits / unitPrice);
    const bonusBalloons = Math.floor(quantity / 2);
    const bonusItems: Shipment[] = [];

    if (bonusBalloons > 0) {
      bonusItems.push({ sku: SKU.Balloon, quantity: bonusBalloons });
    }

    return {
      adjustedUnitPrice: unitPrice,
      bonusItems,
    };
  }
}

export class FivePlusCrayonBoxDiscount implements PerkStrategy {
  award(
    order: Order,
    unitPrice: number
  ): { adjustedUnitPrice: number; bonusItems: Shipment[] } {
    let adjustedUnitPrice = unitPrice;

    const quantity = Math.floor(order.credits / unitPrice);

    // If we're giving this particular discount, we round up to the nearest dollar
    if (quantity > 5) {
      adjustedUnitPrice = Math.ceil(unitPrice * 0.9);
    }

    return {
      adjustedUnitPrice,
      bonusItems: [],
    };
  }
}

export class NoPerk implements PerkStrategy {
  award(
    order: Order,
    unitPrice: number
  ): { adjustedUnitPrice: number; bonusItems: Shipment[] } {
    return {
      adjustedUnitPrice: unitPrice,
      bonusItems: [],
    };
  }
}

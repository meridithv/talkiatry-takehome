import { SKU } from "./models";
import {
  PerkStrategy,
  FiveStuffedAnimalBonus,
  TwoCrayonBoxBonus,
  FivePlusCrayonBoxDiscount,
  NoPerk,
} from "./perkStrategies";

export const getPerkStrategy = (sku: SKU): PerkStrategy[] => {
  const strategyMap: { [key in SKU]?: PerkStrategy[] } = {
    [SKU.StuffedAnimal]: [new FiveStuffedAnimalBonus()],
    [SKU.Crayon]: [new TwoCrayonBoxBonus(), new FivePlusCrayonBoxDiscount()],
  };

  return strategyMap[sku] || [new NoPerk()];
};

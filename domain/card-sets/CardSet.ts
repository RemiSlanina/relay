// TODO : update rom categories?: string[]; to categories?: Category[]; if using premade categories
export type CardSet = {
  id: string;
  title: string;
  cardIds?: string[]; // explicit picks
  categories?: string[];
  isDefault?: boolean;
};

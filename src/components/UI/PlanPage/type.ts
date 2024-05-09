import {
  Ingredient,
  Nutrition,
  Recipe,
  RecipeDirection,
  RecipeIngredient,
  User,
} from "@/services/type";

export type FoodCardType = {
  name: string;
  cal: number;
  ingredientsLength: number;
  onClick?: () => void;
  totalTime: number;
};

export type MealPlanType = {
  foodCards: FoodCardType[];
  time: number;
};

export type DayPlanType = {
  order: number;
  date: number;
  mealPlans: MealPlanType[];
};

export type PlanType = {
  dayPlans: DayPlanType[];
};

export type FoodDetailType = Recipe & {
  user?: User;
  nutrition?: Nutrition;
  ingredients: (RecipeIngredient & {
    ingredient: Ingredient;
  })[];
  directions: RecipeDirection[];
};

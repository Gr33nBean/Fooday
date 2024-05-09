export enum StatusType {
  Create = "create",
  Active = "active",
  InActive = "inActive",
}

export enum ActivityType {
  Xsm = "xsm",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xlg = "xlg",
}

export interface User {
  uid: string;
  username: string;
  email: string;
  weight: number;
  height: number;
  activity: ActivityType;
  avatar: string;
  description: string;
  createdAt: Date;
  status: StatusType;
}

export interface HealthNeedType {
  id: number;
  name: string;
  description: string;
}

export interface HealthNeed {
  userId: string;
  description: string;
  healthNeedTypeId: number;
  caloriesNeedPerDay: number;
}

export interface Diet {
  id: number;
  userId: string;
  name: string;
  description: string;
  planLength: number;
  createdAt: Date;
  isPublic: boolean;
  status: StatusType;
}

export interface Plan {
  id: number;
  dietId: number;
  name: string;
  description: string;
  dayPlanLength: number;
  createdAt: Date;
  isPublic: boolean;
  nutritionId: number;
}

export interface DayPlan {
  id: number;
  order: number;
  planId: number;
  mealPlanLength: number;
  nutritionId: number;
}

export interface MealPlan {
  id: number;
  order: number;
  dayPlanId: number;
  startTime: string;
  nutritionId: number;
}

export interface FoodForMeal {
  id: number;
  mealPlanId: number;
  recipeId: number;
  recipeValue: string;
}

export interface Recipe {
  id: number;
  userId: string;
  name: string;
  totalTime: number;
  description: string;
  images: string;
  nutritionId: number;
  createdAt: Date;
  isPublic: boolean;
  status: StatusType;
}

export interface Nutrition {
  id: number;
  calories: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  carbohydrates: number;
  fiber: number;
  sugars: number;
  sodium: number;
  vitaminD: number;
  calcium: number;
  iron: number;
  potassium: number;
}

export interface IngredientType {
  id: number;
  name: string;
}

export interface Ingredient {
  id: number;
  ingredientTypeId: number;
  nutritionId: number;
  name: string;
  image: string;
  isLiquid: boolean;
}

export interface RecipeIngredient {
  id: number;
  recipeId: number;
  ingredientId: number;
  amount: number;
}

export interface RecipeDirection {
  id: number;
  recipeId: number;
  order: number;
  description: string;
  image: string;
}

export interface PlanHistory {
  id: number;
  planId: number;
  userId: string;
  planValue: string;
  startDate: Date;
  skipDate: Date[];
  createdAt: Date;
  isChange: boolean;
}

export interface Blog {
  id: number;
  planId: number;
  userId: string;
  title: string;
  body: string;
  images: string;
  createdAt: Date;
  heart: number;
  clone: number;
  isPublic: boolean;
  status: StatusType;
}

export interface Comment {
  id: number;
  blogId: number;
  userId: string;
  body: string;
  image: string;
  createdAt: Date;
  heart: number;
  status: StatusType;
}

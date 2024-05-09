import { FoodDetailType } from "@/components/UI/PlanPage/type";
import { ActivityType, StatusType } from "@/services/type";

export const foodDetail: FoodDetailType = {
  id: 1,
  userId: "user1",
  name: "Delicious Dish",
  totalTime: 30,
  description: "A mouth-watering recipe",
  images: "image-url",
  nutritionId: 1,
  createdAt: new Date(),
  isPublic: true,
  status: StatusType.Active,
  user: {
    uid: "user1",
    username: "JohnDoe",
    email: "johndoe@example.com",
    weight: 70,
    height: 175,
    activity: ActivityType.Sm,
    avatar: "avatar-url",
    description: "A food lover",
    createdAt: new Date(),
    status: StatusType.Active,
  },
  nutrition: {
    id: 1,
    calories: 300,
    fat: 15,
    saturatedFat: 5,
    transFat: 0,
    cholesterol: 20,
    carbohydrates: 35,
    fiber: 5,
    sugars: 10,
    sodium: 500,
    vitaminD: 10,
    calcium: 100,
    iron: 2,
    potassium: 300,
  },
  ingredients: [
    {
      id: 1,
      recipeId: 1,
      ingredientId: 1,
      amount: 200,
      ingredient: {
        id: 1,
        ingredientTypeId: 1,
        nutritionId: 1,
        name: "Ingredient 1",
        image: "ingredient-image",
        isLiquid: false,
      },
    },
    // Add more ingredients as needed
  ],
  directions: [
    {
      id: 1,
      recipeId: 1,
      order: 1,
      description: "Step 1: Prepare the ingredients",
      image: "step1-image",
    },
    // Add more directions as needed
  ],
};

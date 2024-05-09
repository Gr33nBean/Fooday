import hambuger from "@assets/images/plan/hambuger.png";
import { FoodCardType } from "../type";
import { IonNavLink } from "@ionic/react";
import FoodDetail from "./FoodDetail";

const FoodCard = ({ item }: { item: FoodCardType }) => {
  return (
    <>
      <IonNavLink
        routerDirection="forward"
        component={() => <FoodDetail recipeId={1} />}
      >
        <div className="w-full flex items-center rounded-[10px] bg-white shadow-md py-2 px-3 gap-2">
          <div className="flex-1 font-manrope text-sm">
            <p className="font-bold text-primary ">{item.name}</p>
            <p className="font-normal">
              {item.cal + " cal"} • {item.ingredientsLength + " nguyên liệu"} •{" "}
              {item.totalTime + " phút"}
            </p>
          </div>
          <div className="size-[54px] aspect-square overflow-hidden rounded-full">
            <img
              src={hambuger}
              alt="hambuger"
              className="size-full object-cover"
            />
          </div>
        </div>
      </IonNavLink>
    </>
  );
};

export default FoodCard;

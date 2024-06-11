import { selectIsLoading } from "@/redux/features/dialogSlice";
import { useAppSelector } from "@/redux/hooks";
import Loading from ".";

const ProcessLoading = () => {
  const isLoading: boolean = useAppSelector(selectIsLoading);
  return (
    <div
      style={{
        display: isLoading ? "flex" : "none",
        zIndex: 999,
      }}
      className="fixed inset-0 h-[100vh] w-[100vw] flex items-center justify-center bg-white bg-opacity-70"
    >
      <Loading />
    </div>
  );
};

export default ProcessLoading;

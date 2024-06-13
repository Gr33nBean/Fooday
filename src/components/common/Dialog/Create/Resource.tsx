import ResourcePost, { ResourceProps } from "@/components/common/Resource";
import { resourceService } from "@/services/resource.service";
import { Resource as ResourceItemType } from "@/services/type";
import { sortByTimestamp } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Layout/Loading";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const Resource = ({ handleClose }: { handleClose: () => void }) => {
  const { data: resourceData, isLoading } = useQuery<ResourceItemType[]>({
    queryKey: ["resource_data"],
    queryFn: async () => {
      const res = await resourceService.getAll();
      return res;
    },
  });

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<ResourceItemType[]>([]);

  useDebounce(
    () => {
      setFilter(
        resourceData?.filter((item) => {
          if (!search) {
            return true;
          }

          if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
          }

          if (item.description.toLowerCase().includes(search.toLowerCase())) {
            return true;
          }

          if (
            item.resourceType?.name.toLowerCase().includes(search.toLowerCase())
          ) {
            return true;
          }
          return false;
        }) ?? []
      );
    },
    [resourceData, search],
    800
  );

  return (
    <div className="w-full ">
      <div className=" flex flex-col justify-end  bg-white">
        <div className="bg-extra-light-gray flex items-center rounded-full px-4 py-3 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#657786"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-normal"
          />
        </div>
      </div>
      {isLoading && (
        <div className="w-full py-3 flex items-center justify-center">
          <Loading />
        </div>
      )}

      {filter
        ?.sort((a, b) => sortByTimestamp(a.createAt, b.createAt))
        .map((item, index) => {
          const itemData: ResourceProps = {
            id: item.id,
            createAt: "", //item.createAt,
            name: item.name,
            description: item.description,
            images: item?.images ?? [],
            type: item?.resourceType?.name ?? "",
            isFree: item.isFree,
          };
          return (
            <div key={index}>
              <ResourcePost {...itemData} handleClose={handleClose} />
            </div>
          );
        })}
    </div>
  );
};

export default Resource;

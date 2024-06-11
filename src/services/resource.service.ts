import { domain } from "./type";

export const resourceService = {
  getAll: async () => {
    try {
      const res = await fetch(domain + "/Resource/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          limit: 100,
        }),
      }).then((res) => res.json());

      return res;
    } catch (error) {
      return [];
    }
  },
  create: async (
    data: {
      resourceTypeId: string;
      name: string;
      images: string[];
      description: string;
      isFree: true;
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/Resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      return res;
    } catch (error) {
      return [];
    }
  },
};

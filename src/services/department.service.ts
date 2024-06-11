import { domain } from "./type";

export const departmentService = {
  getAll: async () => {
    try {
      const res = await fetch(domain + "/Department/getALL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          limit: 100,
        }),
      }).then((res) => res.json());
      console.log(res);

      return res;
    } catch (error) {
      return [];
    }
  },
};

import { domain } from "./type";

export const userService = {
  getUser: async (uids: string[]) => {
    try {
      const res = await fetch(domain + "/User/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uids),
      }).then((res) => res.json());
      console.log(res);

      return res;
    } catch (error) {
      return [];
    }
  },

  getAll: async () => {
    try {
      const res = await fetch(domain + "/User/getALL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          limit: 10000,
        }),
      }).then((res) => res.json());
      console.log(res);

      return res;
    } catch (error) {
      return [];
    }
  },
  updateUser: async (
    data: {
      uid: string;
      departmentId: string;
      grade: string;
      username: string;
      birthday: number;
      email: string;
      avatar: string;
      description: string;
      permissionIdToCRUD: string[];
      status: string;
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/User", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res);
      console.log(res);

      return res;
    } catch (error) {
      return [];
    }
  },
  create: async (
    data: {
      uid: string;
      departmentId: string;
      grade: "employee";
      username: string;
      birthday: number;
      email: string;
      avatar: string;
      description: string;
      permissionIdToCRUD: ["admin", "admin", "admin", "admin"];
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      console.log(res);

      return res;
    } catch (error) {
      return [];
    }
  },
};

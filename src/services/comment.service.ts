import { domain } from "./type";

export const commentService = {
  getAll: async () => {
    try {
      const res = await fetch(domain + "/PostComment/getAll", {
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
  createComment: async (
    data: {
      userId: string;
      postId: number;
      content: string;
      images: string[];
      file: string[];
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/PostComment", {
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
  deleteComment: async (ids: number[]) => {
    try {
      const res = await fetch(domain + "/PostComment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      }).then((res) => res.json());

      return res;
    } catch (error) {
      return [];
    }
  },
};

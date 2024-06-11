import { domain } from "./type";

export const postService = {
  createPost: async (
    data: {
      postTypeId: string;
      creatorUid: string;
      eventId: number | null;
      mentionUid: string[];
      title: string;
      content: string;
      images: string[];
      files: string[];
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/Post", {
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
  getAll: async () => {
    try {
      const res = await fetch(domain + "/Post/getAll", {
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
  getAllByUid: async (uid: string) => {
    try {
      const res = await fetch(domain + `/Post/getAllByUid?uid=${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      return res;
    } catch (error) {
      return [];
    }
  },

  getPostDetail: async (ids: number[]) => {
    try {
      const res = await fetch(domain + "/Post/get", {
        method: "POST",
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

  deletePost: async (ids: number[]) => {
    try {
      const res = await fetch(domain + "/Post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      }).then((res) => res);

      return res;
    } catch (error) {
      return [];
    }
  },
};

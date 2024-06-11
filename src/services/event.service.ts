import { domain } from "./type";

export const eventService = {
  getAll: async () => {
    try {
      const res = await fetch(domain + "/Event/getAll", {
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
  createEvent: async (
    data: {
      eventTypeId: string;
      reporterUid: string;
      // resourceId: number;
      postsId: number[];
      paticipantsUid: string[];
      permissionIdToCRUDPost: ["employee", "employee", "employee", "employee"];
      name: string;
      description: string;
      startAt: number;
      endAt: number;
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/Event", {
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
  deleteEvent: async (ids: number[]) => {
    try {
      const res = await fetch(domain + "/Event", {
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
  getAllByUid: async (uid: string) => {
    try {
      const res = await fetch(domain + `/Event/getAllByUid?uid=${uid}`, {
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
  getEventDetail: async (ids: number[]) => {
    try {
      const res = await fetch(domain + "/Event/get", {
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
};

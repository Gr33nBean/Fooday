import { domain } from "./type";

export const requestService = {
  deleteRequest: async (ids: number[]) => {
    try {
      const res = await fetch(domain + "/Request", {
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
  createRequest: async (
    data: {
      requesterUid: string;
      requestTypeId: string;
      reporterUid: string;
      name: string;
      description: string;
      startAt: number;
      endAt: number;
      approvalStatus: "pending";
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/Request", {
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
  getAllByUid: async (uid: string) => {
    try {
      const res = await fetch(
        domain + `/Request/getAllByRequesterUid?uid=${uid}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());

      return res;
    } catch (error) {
      return [];
    }
  },
  getAll: async () => {
    try {
      const res = await fetch(domain + "/Request/getAll", {
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

  updateRequest: async (
    data: {
      id: number;
      // requesterUid: string;
      // requestTypeId: string;
      reporterUid: string;
      // name: string;
      // description: string;
      // startAt: number;
      // endAt: number;
      approvalStatus: string;
      decidedAt: number;
      decisionDetail: string;
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/Request", {
        method: "PUT",
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

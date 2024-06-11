import { domain } from "./type";

export const resourceUsingService = {
  getAll: async () => {
    try {
      const res = await fetch(domain + "/ResourceUsing/getAll", {
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
      const res = await fetch(
        domain + "/ResourceUsing/getAllByBorrowerUid?uid=" + uid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      return res;
    } catch (error) {
      return [];
    }
  },

  deleteResourceUsing: async (ids: number[]) => {
    try {
      const res = await fetch(domain + "/ResourceUsing", {
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

  updateResourceUsing: async (
    data: // {
    //   id: number;
    //   // requesterUid: string;
    //   // requestTypeId: string;
    //   reporterUid: string;
    //   // name: string;
    //   // description: string;
    //   // startAt: number;
    //   // endAt: number;
    //   approvalStatus: string;
    //   decidedAt: number;
    //   decisionDetail: string;
    //   status: "create";
    // }
    {
      id: number;
      // "resourceId": number,
      reporterUid: string;
      // "borrowerUid": string,
      // "startAt": number,
      // "endAt": number,
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/ResourceUsing", {
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

  createResourceUsing: async (
    data: {
      resourceId: number;
      reporterUid: string;
      borrowerUid: string;
      startAt: number;
      endAt: number;
      status: "create";
    }[]
  ) => {
    try {
      const res = await fetch(domain + "/ResourceUsing", {
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

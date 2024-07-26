import { instance } from "./base";

export const categoryApi = {
  get: async () => {
    try {
      const response = await instance.get(`/categories/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  post: async (data: any) => {
    try {
      const response = await instance.post(`/categories/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },
};

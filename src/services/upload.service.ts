export const GGThumbnail = "https://drive.google.com/thumbnail?id=";
export const GGFile = "https://drive.google.com/file/d/";

export const uploadService = {
  uploadFiles: async (files: File[]) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const response = await fetch(
        `https://api-be-abc.azurewebsites.net/api/File/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => {
        return res.json();
      });
      return response;
    } catch (error) {
      return [];
    }
  },
};

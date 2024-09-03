export const fetcher = async (url: string): Promise<any> => {
   const token = localStorage.getItem("access_token");

   if (!token) {
      return Promise.reject("No access token found");
   }

   const response = await fetch(url, {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
      },
   });

   if (!response.ok) {
      throw new Error("Network response was not ok");
   }

   return response.json();
};

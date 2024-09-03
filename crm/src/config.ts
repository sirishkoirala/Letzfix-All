const token = localStorage.getItem("access_token");
const config = {
   headers: {
      Authorization: `Bearer ${token}`,
   },
};
export default config
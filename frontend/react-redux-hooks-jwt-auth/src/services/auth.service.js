// import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";

// const register = (nom, email, password) => {
//   return axios.post(API_URL + "signup", {
//     nom,
//     email,
//     password,
//   });
// };

// const login = (nom, password) => {
//   return axios
//     .post(API_URL + "signin", {
//       nom,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// const logout = () => {
//   localStorage.removeItem("user");
// };

// export default {
//   register,
//   login,
//   logout,
// };

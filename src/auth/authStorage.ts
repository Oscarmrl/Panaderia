export const getAuthUser = () => {
  return {
    isLoggedIn: localStorage.getItem("loggedIn") === "true",
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    idClient: localStorage.getItem("idClient"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("userEmail"),
  };
};

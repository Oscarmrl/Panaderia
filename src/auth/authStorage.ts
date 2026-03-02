export const getAuthUser = () => {
  return {
    isLoggedIn: sessionStorage.getItem("loggedIn") === "true",
    role: sessionStorage.getItem("role"),
    token: sessionStorage.getItem("token"),
    idClient: sessionStorage.getItem("idClient"),
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("userEmail"),
  };
};

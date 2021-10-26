import userTask from "./axiosSetup";

export const login = (email, password) => {
  return userTask
    .post(`auth/login`, { email, password })
    .then((resp) => {
      const user = JSON.stringify({
        token: resp.data.token,
        role: resp.data.role,
        id: resp.data.userId,
      });
      localStorage.setItem("userTasks", user);
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const signUp = (name, email, password) => {
  return userTask
    .put(`auth/signup`, { name, email, password })
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    })
    .catch((err) => console.log(err));
};

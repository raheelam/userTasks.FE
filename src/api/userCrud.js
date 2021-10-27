import userTask from "./axiosSetup";

export const getAllUsers = (page, setUsers, setPages) => {
  return userTask
    .get(`users?page=${page}&perPage=${5}`)
    .then((resp) => {
      return resp.data;
      // const remainder = resp.data.totalItems % 5;
      // console.log(resp.data.users);
      // setPages && setUsers(resp.data.users);
      // setPages(resp.data.totalItems / 5 + (remainder === 0 ? 0 : 1));
    })
    .catch((err) => console.log(err));
};
export const deleteUser = (userId, setUsers, users) => {
  return userTask
    .delete("user/" + userId)
    .then((resp) => {
      setUsers(users.filter((u) => u._id !== userId));
    })
    .catch((err) => console.log(err));
};

export const getUser = (userId) => {
  return userTask
    .get(`user/${userId}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const createUser = (name) => {
  return userTask
    .post(`user/`, { name })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const editUser = (name, userId) => {
  return userTask
    .put(`user/${userId}`, { name })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

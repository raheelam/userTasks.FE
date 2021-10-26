import userTask from "./axiosSetup";

export const deleteTask = (taskId, userId) => {
  return userTask
    .delete("task/" + taskId + "/" + userId)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const getTask = (taskId) => {
  return userTask
    .get(`task/${taskId}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const createTask = (values, userId) => {
  return userTask
    .post(`task`, { ...values, userId })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

export const editTask = (values, taskId) => {
  return userTask
    .put(`task/${taskId}`, { ...values })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => console.log(err));
};

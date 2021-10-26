export const getUser = () => {
  let temp = localStorage.getItem("userTasks");
  return temp !== null ? JSON.parse(temp) : null;
};

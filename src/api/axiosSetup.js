import axios from 'axios';

const prod = 'https://user-task-tp4k.onrender.com/api';
//"https://bunny-user-tasks.herokuapp.com/api/";

export default axios.create({
  baseURL: prod,
  headers: {
    Authorization:
      'Bearer ' +
      (localStorage.getItem('userTasks')
        ? JSON.parse(localStorage.getItem('userTasks')).token
        : ''),
  },
});

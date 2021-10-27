import { useEffect, useState } from "react";

import Modal from "../common/Modal";
import { getUser as getAuthUser } from "../../utils/loggedInUser";
import { getUser } from "../../api/userCrud";
import { editTask, deleteTask, createTask } from "../../api/taskCrud";
import LoadingPage from "../common/LoadingPage";
import { toggleModal } from "../../utils/toggleModal";
import TaskInputForm from "./components/TaskInputForm";
import TaskList from "./components/TaskList";

const UserTasks = (props) => {
  const [user, setUser] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { userId } = props.match.params;

  const toggleDone = async (task) => {
    let data = await editTask(
      {
        description: task.description,
        state: !task.state,
      },
      task._id
    );
    setUser((user) => ({
      ...user,
      tasks: user.tasks.map((t) => (t._id === data.task._id ? data.task : t)),
    }));
  };

  useEffect(() => {
    let isSubcribed = true;
    let auth = getAuthUser();
    if (auth) {
      getUser(userId).then((user) => {
        if (isSubcribed) {
          setUser(user.user);
        }
      });
    }
    return () => (isSubcribed = false);
  }, [userId]);
  if (!user.tasks) {
    return <LoadingPage />;
  }
  return (
    <section className="container  mx-auto p-6 font-mono">
      <section className="container flex justify-between  w-25 p-3 mb-5 rounded bg-yellow-500 ">
        <div>
          <h2>User Information:</h2>
          <p>Name: {user.name}</p>
        </div>
      </section>
      <div className="md:flex justify-between">
        <TaskList
          title="Done tasks"
          topColor="green"
          type="done"
          user={user}
          setSelectedTask={setSelectedTask}
          toggleDone={toggleDone}
          toggleModal={toggleModal}
        />

        <TaskList
          title="Todo tasks"
          topColor="red"
          type="todo"
          user={user}
          setSelectedTask={setSelectedTask}
          toggleDone={toggleDone}
          toggleModal={toggleModal}
        />
      </div>
      <>
        <Modal toggleModal={toggleModal} modalId="addTask" title="Add Task">
          <TaskInputForm
            handleSubmit={async (values) => {
              let data = await createTask(values, userId);
              setUser((u) => ({
                ...u,
                tasks: [...u.tasks, data.task],
              }));
              toggleModal("addTask");
            }}
          />
        </Modal>
        <Modal toggleModal={toggleModal} modalId="editTask" title="Edit Task">
          {selectedTask && (
            <TaskInputForm
              defaultValues={{
                description: selectedTask.description,
                state: selectedTask.state,
              }}
              handleSubmit={async (value) => {
                if (
                  selectedTask.description !== value.description ||
                  selectedTask.state !== value.state
                ) {
                  let data = await editTask(value, selectedTask._id);
                  setUser((user) => ({
                    ...user,
                    tasks: user.tasks.map((t) =>
                      t._id === data.task._id ? data.task : t
                    ),
                  }));
                }
                toggleModal("editTask");
              }}
            />
          )}
        </Modal>
        <Modal
          toggleModal={toggleModal}
          modalId="deleteTask"
          title="Delete Task"
        >
          {selectedTask && (
            <>
              <p className="mb-6 item-center">
                Are you sure you want to delete this User:
                {selectedTask.description}?
              </p>
              <div className="flex">
                <div className="flex-1 mr-4">
                  <button
                    onClick={async () => {
                      if (selectedTask) {
                        setDisabled(true);
                        await deleteTask(selectedTask._id);
                        setUser((users) => ({
                          ...users,
                          tasks: users.tasks.filter(
                            (t) => t._id !== selectedTask._id
                          ),
                        }));
                        setDisabled(false);
                        toggleModal("deleteTask");
                      }
                    }}
                    className={`${
                      disabled
                        ? "opacity-50 cursor-not-allowed py-2 px-4 w-full rounded bg-red-500 text-white focus:outline-none"
                        : "py-2 px-4 w-full rounded bg-red-500 text-white focus:outline-none"
                    }`}
                  >
                    Yes
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    className="text-black py-2 px-4 w-full rounded bg-gray-200 focus:outline-none"
                    onClick={(event) => toggleModal("deleteUser")}
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal>
      </>
      <div
        className="plus rounded-full bg-green-400  hover:bg-green-500  text-left  w-16 h-16 ml-auto    flex items-center cursor-pointer shadow-lg"
        onClick={() => toggleModal("addTask")}
      >
        <p className="font-bold text-2xl text-white m-auto">+</p>
      </div>
    </section>
  );
};

export default UserTasks;

import LoadingPage from "../../common/LoadingPage";
import TaskListItem from "./TaskListItem";
const TaskList = ({
  user,
  type,
  toggleDone,
  toggleModal,
  setSelectedTask,
  title,
  topColor,
}) => {
  if (user == null) {
    return <LoadingPage />;
  }

  return (
    <div className="md:w-1/2 pb-2  mb-8 mr-2 overflow-hidden rounded-lg shadow-lg">
      <div
        className={` px-4 py-3 flex items-center text-md font-semibold  tracking-wide text-left text-gray-900 bg-${topColor}-400 uppercase border-b border-gray-600`}
      >
        <span>{title}</span>
        <span className="float-right bg-black  ml-auto text-white rounded-full p-2">
          {
            user.tasks.filter(
              (t) => t.state === (type === "done" ? true : false)
            ).length
          }
        </span>
      </div>
      <div
        style={{
          minHeight: "50vh",
          maxHeight: "50vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="w-full ">
          <ul className="bg-white ">
            {user.tasks
              .filter((t) => t.state === (type === "done" ? true : false))
              .map((task, index) => {
                return (
                  <TaskListItem
                    key={task._id}
                    task={task}
                    toggleDone={toggleDone}
                    toggleModal={toggleModal}
                    setSelectedTask={setSelectedTask}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

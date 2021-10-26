import LoadingPage from "../../common/LoadingPage";

const TaskListItem = ({ task, setSelectedTask, toggleModal, toggleDone }) => {
  if (task == null) {
    return <LoadingPage />;
  }
  return (
    <li className="text-gray-700 mb-3">
      <div className="px-4 w-100 py-3 border">
        <div className="flex  items-center text-sm">
          <div>
            <h3>Description:</h3>
            <p className="font-semibold text-black">{task.description}</p>
          </div>
        </div>
        <div className=" pt-8 flex justify-end  text-sm ">
          <button
            title="edit task"
            onClick={(event) => {
              setSelectedTask(task);
              toggleModal("editTask");
            }}
            className="text-black hover:text-gray-400 mx-4 cursor-pointer"
          >
            <i className="material-icons-outlined text-base">edit</i>
          </button>
          {task.state && (
            <div
              className="plus rounded-full bg-red-400 hover:bg-red-500  w-10 h-10  flex items-center cursor-pointer shadow-lg"
              onClick={() => {
                toggleDone(task);
              }}
            >
              <i className="material-icons-outlined m-auto text-white text-center text-base">
                undo
              </i>
            </div>
          )}
          {!task.state && (
            <div
              className="plus rounded-full bg-green-400 hover:bg-green-500  w-10 h-10  flex items-center cursor-pointer shadow-lg"
              onClick={() => toggleDone(task)}
            >
              <i className="material-icons-outlined m-auto text-white text-base">
                done
              </i>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskListItem;

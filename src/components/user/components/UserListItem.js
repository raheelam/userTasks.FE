import { Link } from "react-router-dom";
import LoadingPage from "../../common/LoadingPage";

const UserListItem = ({ user, setSelectedUser, toggleModal }) => {
  if (user == null) {
    return <LoadingPage />;
  }
  return (
    <li className=" text-gray-700">
      <div className="px-4  md:flex justify-between py-3 border">
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold text-black">{user.name}</p>
          </div>
        </div>

        <div className="p-2 overflow-hidden hidden md:block  mt-10 md:my-auto  ml-auto mr-2 w-16 text-center text-ms font-semibold border">
          <span
            title={user.tasks.length}
            className={`inline-block w-full truncate p-2  font-semibold leading-tight text-${
              user.tasks.length > 0 ? "green" : "gray"
            }-700 bg-${
              user.tasks.length > 0 ? "green" : "gray"
            }-100 rounded-sm`}
          >
            {user.tasks.length}
          </span>
        </div>
        <div className="md:px-4 flex justify-end items-center md:py-3 text-sm mt-7 md:my-auto  md:border">
          <Link
            title="view user's tasks"
            to={`/user-tasks/${user._id}`}
            className="text-black inline-block border-2  shadow-md hover:bg-gray-100 hover:text-gray-100   cursor-pointer"
          >
            <span className="border-left bg-yellow-500 hover:bg-yellow-700 px-2 py-2  text-base">
              tasks
            </span>
          </Link>

          <span className="float-right ">
            <button
              onClick={(event) => {
                setSelectedUser(user);
                toggleModal("editUser");
              }}
              title="edit user"
              className="text-black hover:text-gray-100 mx-4 cursor-pointer"
            >
              <i className="material-icons-outlined text-base">edit</i>
            </button>
            <button
              title="delete user"
              onClick={(event) => {
                setSelectedUser(user);
                toggleModal("deleteUser");
              }}
              className="text-red-400 hover:text-gray-100 md:ml-2 cursor-pointer "
            >
              <i className="material-icons-round text-base">delete_outline</i>
            </button>
          </span>
        </div>
      </div>
    </li>
  );
};

export default UserListItem;

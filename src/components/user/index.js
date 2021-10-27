import { useEffect, useState } from "react";

import {
  getAllUsers,
  createUser,
  editUser,
  deleteUser,
} from "../../api/userCrud";
import { getUser } from "../../utils/loggedInUser";
import { toggleModal } from "../../utils/toggleModal";
import LoadingPage from "../common/LoadingPage";
import Modal from "../common/Modal";
import UserInputForm from "./components/UserInputForm";
import UserListItem from "./components/UserListItem";

function UserPage() {
  const [users, setUsers] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pages, setPages] = useState(null);

  const handleAddUser = async (value) => {
    let data = await createUser(value);
    setUsers((u) => [
      ...u,
      { _id: data.userId, name: value, state: false, tasks: [] },
    ]);
    toggleModal("addUser");
  };
  const handleEditUser = async (value) => {
    if (selectedUser.name !== value) {
      let data = await editUser(value, selectedUser._id);
      setUsers((users) =>
        users.map((u) => (u._id === data.user._id ? data.user : u))
      );
    }
    toggleModal("editUser");
  };
  const handleDeleteUser = async () => {
    if (selectedUser) {
      setDisabled(true);
      await deleteUser(selectedUser._id);
      setUsers((users) => users.filter((u) => u._id !== selectedUser._id));
      setDisabled(false);
      toggleModal("deleteUser");
    }
  };
  const getUsers = async (pageNo) => {
    let data = await getAllUsers(pageNo);
    if (data && data.users) {
      const remainder = data.totalItems % 5;

      setPages && setUsers(data.users);
      setPages(data.totalItems / 5 + (remainder === 0 ? 0 : 1));
    }
  };

  const getPages = () => {
    if (pages < 2) {
      return;
    }
    let pagination = [];
    for (let i = 1; i <= pages; i++) {
      pagination.push(
        <button
          key={i}
          className="bg-gray-300 rounded-full hover:bg-gray-400 p-3 m-2"
          onClick={() => getUsers(i)}
        >
          {i}
        </button>
      );
    }
    return pagination;
  };

  useEffect(() => {
    let auth = getUser();
    if (auth && auth.role === "admin") {
      getUsers(1);
    }
  }, []);

  if (!users) {
    return <LoadingPage />;
  }

  return (
    <section className="container mx-auto  p-6 pt-5 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="text-md font-semibold w-full tracking-wide text-left text-gray-900 bg-yellow-500 uppercase border-b border-gray-600">
          <p className="px-4 py-3">Users</p>
        </div>
        <div
          style={{
            minHeight: "60vh",
            maxHeight: "60vh",
            overflowY: "auto",
            overflowX: "hidden",
            background: "white",
          }}
        >
          <ul className="w-full bg-white">
            {users.map((user, index) => {
              return (
                <UserListItem
                  key={user._id}
                  user={user}
                  setSelectedUser={setSelectedUser}
                  toggleModal={toggleModal}
                />
              );
            })}
          </ul>
        </div>
        <div className="p-2 bg-yellow-500 flex flex-nowrap items-center md:justify-end overflow-x-auto h-20 w-full  text-center">
          {getPages()}
        </div>
      </div>

      <>
        <Modal toggleModal={toggleModal} modalId="addUser" title="Add">
          <UserInputForm handleSubmit={handleAddUser} />
        </Modal>
        <Modal toggleModal={toggleModal} modalId="editUser" title="Edit User">
          {selectedUser && (
            <UserInputForm
              defaultValue={selectedUser.name}
              handleSubmit={handleEditUser}
            />
          )}
        </Modal>
        <Modal
          toggleModal={toggleModal}
          modalId="deleteUser"
          title="Delete User"
        >
          {selectedUser && (
            <>
              <p className="mb-6 item-center">
                Are you sure you want to delete this User: {selectedUser.name}?
              </p>
              <div className="flex">
                <div className="flex-1 mr-4">
                  <button
                    onClick={handleDeleteUser}
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
        className="plus rounded-full bg-green-400  hover:bg-green-500   w-16 h-16 ml-auto     flex items-center cursor-pointer shadow-lg"
        onClick={() => toggleModal("addUser")}
      >
        <p className="font-bold text-2xl text-white m-auto">+</p>
      </div>
    </section>
  );
}

export default UserPage;

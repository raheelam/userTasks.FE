import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <div className="flex bg-gray-100 items-center p-5  mb-3 justify-between">
      {(user && user.role !== "basic" && (
        <Link to="/" className="text-black hover:text-black">
          <h1>UTS</h1>
        </Link>
      )) || <h1 className="cursor-pointer">UTS</h1>}
      {user && user.role !== "basic" && (
        <Link title="home" className="ml-auto mr-3" to="/">
          <div
            className="plus  rounded-full bg-yellow-500  hover:bg-yellow-600 w-12 h-12 md:w-16 md:h-16   
        flex items-center cursor-pointer shadow-lg"
          >
            <p className="material-icons-outlined font-bold text-white m-auto text-base">
              home
            </p>
          </div>
        </Link>
      )}

      <div
        onClick={async () => {
          await localStorage.removeItem("userTasks");
          window.location.reload();
        }}
        className="plus rounded-full bg-gray-400  hover:bg-gray-500 w-12 h-12 md:w-16 md:h-16   
        flex items-center cursor-pointer shadow-lg"
      >
        <p className="material-icons-outlined font-bold text-white m-auto text-base">
          logout
        </p>
      </div>
    </div>
  );
};
export default Header;

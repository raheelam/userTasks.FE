import { useEffect, useState } from "react";

const UserInputForm = ({ handleSubmit, defaultValue }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(value);
        if (!defaultValue) setValue("");
      }}
    >
      <div className={`text-center`}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name="text"
          required
          placeholder={`name`}
          className="bg-gray-100 p-4 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
        />
        {/* <button
          title="add new user"
          className="bg-green-500 hover:bg-green-700 py-4 px-4 border-2 shadow-md"
        >
          {defaultValue ? "Save" : "+"}
        </button> */}
        <button
          type="submit"
          className={`bg-yellow-500 w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-orange-600`}
        >
          {defaultValue ? "Save" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default UserInputForm;

import { useEffect, useState } from "react";

const TaskInputForm = ({ handleSubmit, defaultValues }) => {
  const [values, setValues] = useState({});
  useEffect(() => {
    if (defaultValues) {
      setValues({ ...defaultValues, state: defaultValues.state });
    }
  }, [defaultValues]);

  return (
    <form
      id="taskForm"
      className=" w-full my-5  "
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
        if (!defaultValues) setValues({ description: "", state: false });
      }}
    >
      {defaultValues && (
        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setValues({ ...values, state: e.currentTarget.checked })
            }
            checked={values.state}
          />
          Done
        </label>
      )}
      <textarea
        onChange={(e) => {
          setValues({ ...values, description: e.target.value });
        }}
        value={values.description}
        name="description"
        rows="5"
        required
        placeholder="Enter task description"
        className=" bg-gray-100 p-2 w-full  border-2  shadow-md focus:outline-none focus:border-gray-300"
      ></textarea>

      <button
        type="submit"
        className={`bg-yellow-500 w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-orange-600`}
      >
        {defaultValues ? "Save" : "Add Task"}
      </button>
      {/* <Button color="green">
          {defaultValues ? "Save changes" : "Create Task"}
        </Button>
        <br />
        <Button type="reset" color="gray">
          Reset Form
        </Button> */}
    </form>
  );
};

export default TaskInputForm;

const Button = ({
  color,
  textColor = "gray",
  children,
  onHandleClick,
  ...other
}) => {
  let classes;
  if (color) {
    classes = `inline-flex items-center px-5 py-3 border border-${color}-600 rounded-md shadow-sm m-2 mt-0 text-sm font-medium text-${textColor}-200 bg-${color}-500 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 $`;
  } else {
    classes =
      "inline-flex items-center px-5 py-3 border border-gray-300 rounded-md shadow-sm text-sm m-2 mt-0 font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  }
  return (
    <button
      onClick={onHandleClick}
      className={classes}
      aria-expanded="false"
      aria-haspopup="true"
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;

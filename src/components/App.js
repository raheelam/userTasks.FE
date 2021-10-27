import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import UserTasks from "./user-tasks";
import UserPage from "./user";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Header from "./common/Header";
import { getUser } from "../utils/loggedInUser";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUser());
  }, []);

  const isAuthorized = user !== null;

  return (
    <BrowserRouter basename="">
      {isAuthorized && <Header user={user} />}

      <Switch>
        {!isAuthorized ? (
          <>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Redirect to="/auth/login" />
          </>
        ) : (
          <>
            <Redirect
              from="/auth/login"
              to={`${user.role !== "basic" ? "/" : "/user-tasks/" + user.id}`}
            />
          </>
        )}
      </Switch>

      <Route path="/" exact component={UserPage} />
      <Route path="/user-tasks/:userId" exact component={UserTasks} />
    </BrowserRouter>
  );
};
export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import ListProvider from "./contexts/listprovider";
import { UserProvider, useUserContext } from "./contexts/usercontext";
import NotAuthorized from "./pages/NotAuthorized";

/**
 *
 *  [1,2,3,4].map(callbackfunction)
 * [1,2,3,4].map((eachInput)=>value)
 *
 *
 *  {path: '/', element: <Index/>} ==> <Route key="/" path="/" element={<Index/>} />
 */
const ComponentWrapper = (props) => {
  const { user, isLoggedIn } = useUserContext()
  console.log(props, user, 'props')
  if ((props.auth && !isLoggedIn) || (props.roles && !props.roles.includes(user?.role))) {
    return <>
      <NotAuthorized />
    </>
  }
  return <>
    {props.element}
  </>
}

const App = () => {
  return (
    <Router>
      <UserProvider>
        <ListProvider>

          <Routes>
            {routes.map((each) => (
              <Route key={each.path} path={each.path} element={<ComponentWrapper {...each} />} />
            ))}
          </Routes>
        </ListProvider>
      </UserProvider>
    </Router>
  );
};

export default App;

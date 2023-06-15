import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import Button from "../components/button";
import { useUserContext } from "../contexts/usercontext";

const Header = () => {
  const { logoutUser, isLoggedIn } = useUserContext()

  const filteredRoutes = useMemo(() => {
    const routesList = routes.filter((route) => !!route.name)
    return isLoggedIn ? routesList : routesList.filter((route) => !isLoggedIn && !route.auth)
  }, [isLoggedIn])

  return (
    <div
      className="flex justify-between items-center w-screen px-20 flex-wrap"
    >
      <div className="text-purple-600 font-bold uppercase">React Workshop</div>
      <div
        className="flex items-center flex-nowrap divide-x-2 divide-[#861eb2]"
      >
        {filteredRoutes.map((each) => {
            if(each.path === '/login' && isLoggedIn) return null
            return (
            <Link className="text-sm hover:text-purple-800 px-4" key={each.path} to={each.path}>
              {each.name}
            </Link>
          )})}
        {isLoggedIn && <Button onClick={() => logoutUser()} text="Logout" />}

      </div>

    </div>
  );
};

export default Header;

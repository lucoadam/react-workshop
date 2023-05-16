import Index from "../pages";
import About from "../pages/about";
import Contact from "../pages/contact";
import ContextPage from "../pages/context";
import ItemsPage from "../pages/items";
import Page404 from "../pages/Page404";
import UsersPage from "../pages/users";
import CreateOrEditUser from "../pages/users/createOrEdit";
import ViewUser from "../pages/users/view";

export const routes = [
  {
    path: "/",
    element: <Index />,
    name: "Home",
  },
  {
    path: "/about",
    element: <About />,
    name: "About",
  },
  {
    path: "/contact",
    element: <Contact />,
    name: "Contact",
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    name: "Context",
    path: "/context",
    element: <ContextPage/>
  },
  {
    name: "Items",
    path: "/items",
    element: <ItemsPage/>
  },
  {
    path: "/users",
    name: "Users",
    element: <UsersPage/>
  },
  {
    path: "/users/create",
    element: <CreateOrEditUser/>
  },
  {
    path: "/users/:id",
    element: <ViewUser/>
  },
  {
    path: "/users/:id/edit",
    element: <CreateOrEditUser/>
  },
];

import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { GroupChat } from "./pages/GroupChat";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/search",
    Component: SearchResults,
  },
  {
    path: "/group/:groupId",
    Component: GroupChat,
  },
]);

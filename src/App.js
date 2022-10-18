import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginBootstrap from "./components/LoginBootstrap/LoginBootstrap";
import RegisterReactBootstrap from "./components/RegisterReactBootstrap";
import Main from "./layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <RegisterReactBootstrap></RegisterReactBootstrap>,
      },
      {
        path: "/register",
        element: <RegisterReactBootstrap></RegisterReactBootstrap>,
      },
      {
        path: "/login",
        element: <LoginBootstrap></LoginBootstrap>,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { FetchOld } from "./Pages/FetchOld";
import { FetchRQ } from "./Pages/FetchRQ";
import { Home } from "./Pages/Home";
// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router= {router}></RouterProvider>
};

export default App;
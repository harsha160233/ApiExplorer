import Home from "./Home";
import Accordion from "./Accordion";
import ApiDetail from "./ApiDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import ApiRootLayout from "./ApiRootLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "apilist",
        element: <ApiRootLayout />,
        children: [
          { index:true, element: <Accordion />},
          { path: ":apiId", element: <ApiDetail />},
        ],
      },
    ],
  }
]);
function App() {
  return (
     <RouterProvider router={router} />
  );
}

export default App;

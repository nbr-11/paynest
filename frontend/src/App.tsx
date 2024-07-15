import React  from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";


interface RouteType {
  path: string,
  element: React.ReactNode
}

const App: React.FC = () => {



  const routes: Array<RouteType> = [
   
    {
      path: "/signin",
      element: <SignIn/>
    },
    {
      path: "/signup",
      element:<SignUp/>
    },
    {
      path: "/dashboard",
      element:<Dashboard/>
    },
    {
      path: "/transfer",
      element:<Transfer/>
    }
  ]



  return <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">


    <BrowserRouter>

      <Routes>

        {
          routes.map((route) => {
            return <Route path={route.path} element={route.element}></Route>
          })
        }
      </Routes>

    </BrowserRouter>

  </div>
}

export default App;
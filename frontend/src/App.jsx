

import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./layouts/Layout";
import { Toaster } from "react-hot-toast";

import Profile from "./pages/profile/Profile";
import AddProblem from "./pages/profile/AddProblem";
import TopicwiseProblem from "./pages/dashboard/TopicwiseProblem";
import Problem from "./pages/dashboard/problem/Problem";
import MyProblems from "./pages/profile/MyProblems";
import Bookmarked from "./pages/profile/Bookmarked";
import Details from "./pages/profile/leaderboard/Details";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import About from "./pages/About";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
         <About/>
          {/* <Dashboard /> */}
        </Layout>
      ),
    },
    {
     path:"/dashboard",
     element:(
      <Layout>
        {/* <Explorer/> */}
        <Dashboard />
      </Layout>
     )
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/signup",
      element: (
        <Layout>
          <Signup />
        </Layout>
      ),
    },
    {
      path:"/profile",
      // element:<><Navbar/><Profile/></>
      element:(
        <ProtectedRoute>
        <>
          <Profile/>
        <Navbar/>
        </>
        </ProtectedRoute>
      )
    },
    {
      path:"/addProblem",
      element:(
        <ProtectedRoute>
        <Layout>
          <AddProblem/>
        </Layout>
        </ProtectedRoute>
      )
    },{

      path:"/topics/:topicId",
      element:(
        <Layout>
          <TopicwiseProblem/>
        </Layout>
      )
    },
    {
      path:"/problems/:problemId",
      element:<><Navbar/><Problem/></>
    },
    {
      path:"/myProblems",
      element:(
        <ProtectedRoute>
        <Layout>
          <MyProblems/>
        </Layout>
        </ProtectedRoute>
      )
    },
    {
      path:"/profile/bookMarked",
      element:(
        <ProtectedRoute>
        <Layout>
          <Bookmarked/>
        </Layout>
        </ProtectedRoute>
      )
    },
    {
      path:"/group/details",
      element:(
        <ProtectedRoute>
        <Layout>
          <Details/>
        </Layout>
        </ProtectedRoute>
      )
    },
    {
  path: "*",
  element: <NotFound />,
}
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router}/>
    </>
  );
}

export default App;


/*
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
//import Layout from "./layouts/Layout";
import { Toaster } from "react-hot-toast";
import Explorer from "./pages/Explorer";
import Profile from "./pages/profile/Profile";
import AddProblem from "./pages/AddProblem";
import TopicwiseProblem from "./pages/dashboard/TopicwiseProblem";
import Problem from "./pages/dashboard/problem/Problem";
import MyProblems from "./pages/profile/MyProblems";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<><Navbar/><Dashboard/><Footer/></>
       
    },
    {
     path:"/explorer",
     element:<><Navbar/><Explorer/></>
    },
    {
      path: "/login",
      element: <><Navbar/><Login/></>
    },
    {
      path: "/signup",
      element: <><Navbar/><Signup/></>
    },
    {
      path:"/profile",
      element:<><Navbar/><Profile/></>
    },
    {
      path:"/addProblem",
      element:<><Navbar/><AddProblem/></>
    },{

      path:"/topics/:topicId",
      element:<><Navbar/><TopicwiseProblem/></>
    },{
      path:"/problems/:problemId",
      element:<><Navbar/><Problem/></>
    },
    {
      path:"/myProblems",
      element:<><Navbar/><MyProblems/></>
      
    }
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
*/
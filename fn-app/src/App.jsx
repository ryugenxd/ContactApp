import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import User from './pages/User';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import CreateContact from './pages/CreateContact';


const router = createBrowserRouter([
{
  path:'/',
  element:<MainLayout/>,
  children:[
    {
      path:'/',
      element:<Navigate to="/dashboard"/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    },{
      path:'/create',
      element:<CreateContact/>
    },{
      path:'/profile',
      element:<User/>
    }
  ]
},{
  path:'/',
  element:<AuthLayout/>,
  children:[
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    }
  ]
},{
  path:"*",
  element:(
    <NotFound/>
  ),
}
]);

const App = () => {
  return (
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  )
}

export default App
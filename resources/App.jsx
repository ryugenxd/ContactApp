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
import DetailContact from './pages/DetailContact';
import ListAddress from './pages/ListAddress';
import CreateAddress from './pages/CreateAddress';
import DetailAddress from './pages/DetailAddress';


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
    },
    {
      path:'/profile',
      element:<User/>
    }
    ,{
      path:'/contact/:id',
      element:<DetailContact/>
    },
    {
      path:'/contact/:contactId/addresses',
      element:<ListAddress/>
    },
    {
      path:'/contact/:contactId/address/:addressId',
      element:<DetailAddress/>
    },
    {
      path:'/contact/address/create/:contactId',
      element:<CreateAddress/>
    },
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
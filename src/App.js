import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css';
import Appointment from './views/Appointment';
import Appointments from './views/Appointments';
import CreateAppointment from './views/CreateAppointment';
import Login from './views/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './views/Root';
import { createContext, useContext, useLayoutEffect, useState } from 'react';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Appointments />
      },
      {
        path: 'appointments/:id',
        element: <Appointment />
      },
      {
        path: '/appointments/create',
        element: <CreateAppointment />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])

const queryClient = new QueryClient()
const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

function App() {
  const [isAuth, setIsAuth] = useState(false)

  useLayoutEffect(() => {
    setIsAuth(prevState => sessionStorage.getItem('accessToken') ? true : false)
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App;

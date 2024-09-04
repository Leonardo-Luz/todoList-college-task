import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Error, Home, TodoList } from './routes';

const router = createBrowserRouter([
  {
     path: '/',
     element: <App/>,
     errorElement: <Error />,
     children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/todo',
          element: <TodoList />
        },
     ]
  }
])

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './app/routers/router.tsx'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)

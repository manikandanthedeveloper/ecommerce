import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import './index.css'
import store from './store/index.ts';
import { Toaster } from 'react-hot-toast';

const App = lazy(() => import('./App.tsx'));

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster toastOptions={{
        position: "bottom-right",
        style: {
          backgroundColor: "#ffffff",
          color: "#000000"
        }
      }} />
    </BrowserRouter>
  </Provider>,
)

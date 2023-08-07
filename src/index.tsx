import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {Cars, Login, LogBook} from './components/'
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store'
import { ErrorPage } from './components/ErrorPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
 [
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/cars',
        element: <Cars />,
      },
      {
        path: '/cars/:id',
        element: <LogBook />,
      }
      
    ]
  }
 ],
 {
   basename:"/cestak"
 }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      {/* <ApiProvider api={apiSlice}> */}
     <Provider store={store}>
      {/* <Suspense fallback="Loading ..."> */}
        <RouterProvider router={router} />
        {/* </Suspense> */}
        {/* </ApiProvider> */}
        </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

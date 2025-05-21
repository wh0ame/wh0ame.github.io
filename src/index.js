import React from 'react';
import ReactDOM from 'react-dom/client';
import Ipoteka from './Ipoteka/Ipoteka';
import Catalog from './catalog/Catalog';
import TestPivo from './catalog/Pivo';
import Contacts from './contacts/Contacts';
import Agreement from './agreement/Agreement';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ipoteka",
    element: <Ipoteka />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/pizdes",
    element: <TestPivo />
  },
  {
    path: "/header",
    element: <App />
  },
  {
    path: "/contacts",
    element: <Contacts />
  },
  {
    path: "/agreement",
    element: <Agreement />
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

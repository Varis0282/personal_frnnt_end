import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import routes from './routes/Routes';
import { Loader } from './common/components';
import { useSelector } from 'react-redux';

const App = () => {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}
      <ToastContainer position="top-right" theme="colored" autoClose="3000" hideProgressBar={true} />
      <RouterProvider router={routes} />
    </div>

  )
}

export default App

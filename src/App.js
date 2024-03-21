import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import routes from './routes/Routes';
import { Loader } from './common/components';
import { useSelector } from 'react-redux';
import { FloatButton } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const App = () => {
  const { loading } = useSelector((state) => state.loaders);
  console.log("Test")
  return (
    <div>
      {loading && <Loader />}
      <ToastContainer position="top-right" theme="colored" autoClose="3000" hideProgressBar={true} />
      <FloatButton icon={<ArrowUpOutlined />} tooltip={"Go to top"} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      <RouterProvider router={routes} />
    </div>

  )
}

export default App

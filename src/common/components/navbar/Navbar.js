import React, { useState } from 'react'
import { Dropdown, message, Tooltip } from 'antd';
import { CloseOutlined, UserOutlined, QuestionCircleOutlined, LaptopOutlined, UnorderedListOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const handleMenuClick = (e) => {
    console.log('Menu item clicked on number', e.key)
  }

  const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
    {
      label: 'My Doubts',
      key: '1',
      icon: <QuestionCircleOutlined />,
      onClick: () => {
        // navigate('/doubts');
        message.info('Doubts Coming Soon');
      }
    },
    {
      label: 'My Classes',
      key: '2',
      icon: <LaptopOutlined />,
      onClick: () => {
        // navigate('/classes');
        message.info('Classes Coming Soon');
      }
    },
    {
      label: 'My Courses',
      key: '3',
      icon: <UnorderedListOutlined />,
      onClick: () => {
        // navigate('/courses');
        message.info('Courses Coming Soon');
      }
    },
    {
      label: user ? 'Logout' : 'Login',
      key: '4',
      icon: user ? <LogoutOutlined /> : <UserOutlined />,
      danger: user ? true : false,
      onClick: () => {
        if (user) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          message.success('Logged out successfully');
          navigate('/login');
        } else {
          navigate('/login');
        }
      }
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  return (
    <>
      <div className='bg-[#16143ff0] w-full flex fixed z-[1000] backdrop-blur-md justify-between py-1'>
        <div className="cursor-pointer md:hidden md:w-0 px-3 flex items-center">
          <button
            onClick={() => { isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true) }}
          >
            {!isMenuOpen ?
              <MenuOutlined className="text-white text-2xl" /> :
              <CloseOutlined className="text-white text-2xl" />
            }
          </button>
        </div>
        <div id="logo" className="md:flex hidden w-1/3">
          {/* <img src="https://trainings.internshala.com/static/images/common/ist_logo.svg?v=1.0" alt="Logo" className='w-48 cursor-pointer' onClick={() => { navigate('/') }} /> */}
        </div>
        <div id="title" className="flex items-center justify-center flex-col md:w-1/3 md:ml-0 -ml-4 w-[95%]">
          <h1 className="text-white md:text-3xl text:lg font-medium cursor-pointer" onClick={() => navigate('/')}>Mere Personal Guru</h1>
          <p className='text-sm text-orange-500 font-medium cursor-pointer' onClick={() => navigate('/')}>Apka Apna Online Tutor</p>
        </div>
        <div className="md:flex hidden flex-row w-1/3 justify-end items-center gap-6">
          {user && user?.role === 'admin' && <button
            className='text-white text-sm rounded-lg border-white border px-2 py-1 font-normal cursor-pointer 
            hover:bg-white hover:text-black hover:border-black hover:shadow-md transition-all duration-200'
            onClick={() => { navigate('/admin') }}>
            Admin Panel
          </button>}
          {user &&
            <Dropdown.Button
              className='w-auto'
              id='userDropdown'
              style={{ color: 'white' }}
              menu={menuProps}
              icon={<UserOutlined />}
              buttonsRender={([leftButton, rightButton]) => [
                <Tooltip title="Your Profile" key="leftButton" className='text-white' onClick={() => { navigate('/profile') }}>
                  {leftButton}
                </Tooltip>,
                React.cloneElement(rightButton, {
                  loading: false, className: 'text-white'
                }),
              ]}
            >
              {user && user?.name}
            </Dropdown.Button>
          }
        </div>
      </div>
      <div className={`md:hidden absolute z-50 flex flex-col w-full pt-16 bg-white flex-nowrap text-black transition-all duration-700 ${isMenuOpen ? 'left-0' : 'left-[-1000px]'}`}>
        {user && <div id="logo" className="w-full gap-2 flex items-center flex-row py-1 border-b">
          <div className="flex bg-orange-500 rounded-full w-14 h-14 justify-center items-center text-4xl text-white cursor-pointer" onClick={() => { navigate('/profile') }}>
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col justify-center items-start">
            <p className='text-lg font-medium'>{user?.name}</p>
            <p className=''> {user?.email}</p>
          </div>
        </div>}
        {!user &&
          <div id="logo" className="w-full gap-2 flex items-center flex-row py-1 border-b">
            <div className="flex bg-orange-500 rounded-full w-14 h-14 justify-center items-center text-4xl text-white">
              <UserOutlined />
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className='text-lg font-medium'>Guest</p>
              <p className=''>
                Please Login to continue
              </p>
            </div>
          </div>
        }
        <div className="flex flex-col justify-center items-start">
          {items.map((item, index) => {
            return (
              <div key={index} onClick={item.onClick} className={`flex flex-row justify-start items-center w-full gap-3 py-2 transition-all duration-200 px-4 ${item.danger === true ? 'text-red-500 hover:bg-red-500 hover:text-white' : 'hover:bg-[#f0f0f0]'}`}>
                <p className={``}>{item.icon}</p>
                <button className={``}>{item.label}</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Navbar

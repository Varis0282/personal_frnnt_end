import React, { useEffect, useState } from 'react'
import { PageWithNavbar } from '../../common/components'
import axios from 'axios'
import { message, Table, Input, Space, Button, Collapse } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import baseUrl from '../../config'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/loaderReducer';
import CourseCollapse from './courseCollapse/CourseCollapse'

const Admin_Dashboard = () => {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const headers = {
    'Content-Type': 'application',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/admin/users`, { headers })
      console.log(response.data)
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    } catch (error) {
      message.error('Failed to fetch users')
    }
  }

  const getAllCourses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/admin/courses`, { headers })
      console.log(response.data.courses[0])
      setCourses(response.data.courses);
    } catch (error) {
      message.error('Failed to fetch courses')
    }
  }

  const getAllDoubts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/admin/doubts`, { headers })
      console.log(response.data)
      dispatch(setLoading(false));
    } catch (error) {
      message.error('Failed to fetch doubts')
    }
  }

  const getAllData = async () => {
    dispatch(setLoading(true));
    getAllUsers();
    getAllCourses();
    getAllDoubts();
  }

  const handleSearchChange = () => {
    let filteredData = users.filter((val) => {
      return val.email.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredUsers(filteredData);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filterDropdown: ({ confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => {
              search !== '' ? handleSearchChange() : confirm();
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            onKeyUp={(e) => { e.key === 'Enter' && handleSearchChange() }}
          />
          <Space>
            <Button
              onClick={() => handleSearchChange()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => setSearch('')} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
    },
    {
      title: "Passout Year",
      dataIndex: "passoutYear",
      key: "passoutYear",
      sorter: (a, b) => a.passoutYear - b.passoutYear
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          text: 'Admin',
          value: 'admin',
        },
        {
          text: 'User',
          value: 'user',
        }
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses',
      align: 'center',
      render: courses => <span>{courses.length}</span>,
      sorter: (a, b) => a.courses.length - b.courses.length,
    }
  ];

  useEffect(() => {
    getAllData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (search === '') {
      setFilteredUsers(users);
    }
  }, [search, users]);

  return (
    <PageWithNavbar>
      {user.role === 'admin' ? <div className='flex flex-col justify-center items-center m-2 w-[99%] p-2 border'>
        <h1 className='text-3xl text-center font-medium mb-2'>Admin Dashboard</h1>
        <div className="flex lg:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col border rounded-md lg:w-1/2 lg:overflow-hidden overflow-x-scroll">
            <h1 className='text-2xl text-center my-2 font-medium'>Users {users && `(${users.length})`}</h1>
            <Table columns={columns} dataSource={filteredUsers} />
          </div>
          <div className="flex flex-col border p-2 rounded-md lg:w-1/2 overflow-y-scroll h-[80vh]">
            <h1 className='text-2xl text-center my-2 font-medium'>Courses {courses && `(${courses.length})`}</h1>
            <Collapse
              collapsible="header"
              defaultActiveKey={1}
              expandIconPosition='right'
              accordion
              items={[
                {
                  key: '1',
                  label: <p className='text-2xl font-medium'>{`${courses[0]?.name} (${courses[0]?.enrolledUsers.length})`}</p>,
                  children: courses[0] && <CourseCollapse data={courses[0]} getAllCourses={getAllCourses} />,
                },
              ]}
            />
          </div>
        </div>
      </div> : <h1>Unauthorized</h1>}
    </PageWithNavbar>
  )
}

export default Admin_Dashboard

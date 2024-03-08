import React, { useEffect, useState } from 'react'
import { Feild, PageWithNavbar } from '../../common/components';
import baseUrl from '../../config';
import axios from 'axios';
import { message, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { UserOutlined, HomeOutlined, MailOutlined, BankOutlined, BookOutlined, PartitionOutlined, CalendarOutlined } from '@ant-design/icons';


const Profile = () => {
    const [user, setUser] = useState();
    const dispatch = useDispatch();
    const [save, setSave] = useState(false);
    const [userDetails, setUserDetails] = useState(user);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setSave(true);
        setUserDetails({ ...userDetails, [name]: value });
    };

    const saveHandler = async () => {
        if (userDetails.phone.startsWith('+91')) {
            message.error('Please enter the phone number without country code');
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.put(`${baseUrl}/api/me/update`, userDetails, { headers });
            console.log("🚀 ~ file: Profile.js:25 ~ saveHandler ~ response", response);
            message.success('Profile updated successfully');
            setSave(false);
            getUser();
            dispatch(setLoading(false));
        } catch (error) {
            console.log("🚀 ~ file: Profile.js:35 ~ saveHandler ~ error", error);
            message.error(error.response.data.message || 'Some error occured');
            dispatch(setLoading(false));
        }
    };

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
    const getUser = async () => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(`${baseUrl}/api/me`, { headers });
            setUser(response.data.user);
            setUserDetails(response.data.user);
            dispatch(setLoading(false));
        } catch (error) {
            console.log("🚀 ~ file: Profile.js:47 ~ getUser ~ error", error);
            message(error.response.data.message || 'Some error occured', { type: 'error' })
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageWithNavbar>
            {user &&
                <div className="flex px-6 py-4 flex-col p-2">
                    <div className='text-3xl mt-2 mb-2'>{user.name}<span className='font-medium'>{user.role==='admin'&&' - Admin'}</span></div>
                    <div className="border rounded-lg flex flex-row justify-between p-2">
                        {/* user profile */}
                        <div className="flex flex-col items-center justify-center gap-6 p-5 w-full">
                            <p className="bg-orange-500 my-4 text-white rounded-full flex justify-center items-center text-4xl w-20 h-20">
                                {userDetails.name[0]?.toUpperCase()}
                            </p>
                            <div className='w-full flex flex-col gap-4 pt-4'>
                                <div className='w-full flex flex-row gap-2'>
                                    <Feild
                                        label={'Name'}
                                        value={userDetails.name}
                                        name='name'
                                        leftAddOn={<UserOutlined />}
                                        readOnly
                                        tooltip={'You cannot change your name'}
                                    />
                                    <Tooltip title='You cannot change your email' onClick={() => { message('Contact Admin to update email', { type: 'info' }) }}>
                                        <Feild
                                            label={'Email'}
                                            value={userDetails.email}
                                            name='email'
                                            leftAddOn={<MailOutlined />}
                                            tooltip={'You cannot change your email'}
                                            readOnly
                                        />
                                    </Tooltip>
                                </div>
                                <div className='w-full flex flex-row gap-2'>
                                    <Feild
                                        label={'Phone Number'}
                                        leftAddOn='+91'
                                        value={userDetails.phone}
                                        name='phone'
                                        readOnly
                                        tooltip={'You cannot change your phone number'}
                                    />
                                    <Feild
                                        label={'City'}
                                        value={userDetails.city}
                                        name='city'
                                        leftAddOn={<HomeOutlined />}
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className='w-full flex flex-row gap-2'>
                                    <Feild
                                        label={'College'}
                                        value={userDetails.college}
                                        name='college'
                                        leftAddOn={<BankOutlined />}
                                        onChange={inputChangeHandler}
                                    />
                                    <Feild
                                        label={'Course'}
                                        value={userDetails.course}
                                        name='course'
                                        leftAddOn={<BookOutlined />}
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                                <div className='w-full flex flex-row gap-2'>
                                    <Feild
                                        label={'Branch'}
                                        value={userDetails.branch}
                                        name='branch'
                                        leftAddOn={<PartitionOutlined />}
                                        onChange={inputChangeHandler}
                                    />
                                    <Feild
                                        label={'Passout Year'}
                                        value={userDetails.passoutYear}
                                        name='passoutYear'
                                        leftAddOn={<CalendarOutlined />}
                                        readOnly={user.passoutYear ? true : false}
                                        onChange={inputChangeHandler}
                                        tooltip={'You cannot change your passout year once set. Contact Admin to update it.'}
                                    />
                                </div>
                                <div className='w-full flex flex-row gap-2'>
                                    <Feild
                                        label={'Mail Verified'}
                                        value={user?.mailVerified ? 'Yes' : 'No'}
                                        name='mailVerified'
                                        readOnly
                                        inputClassNames={`text-white ${user?.mailVerified ? 'bg-green-500' : 'bg-red-500'}`}
                                    />
                                    <Feild
                                        label={'Phone Verified'}
                                        value={user?.phoneVerified ? 'Yes' : 'No'}
                                        name='phoneVerified'
                                        readOnly
                                        inputClassNames={`text-white ${user?.phoneVerified ? 'bg-green-500' : 'bg-red-500'}`}
                                        note={<span className='text-orange-500'>This feature will be available soon</span>}
                                    />
                                </div>
                                <div className='w-full flex flex-row justify-center sm:justify-end items-center gap-2'>
                                    <button className="text-orange-500 w-1/2 sm:w-1/6 border-orange-500 border p-2 rounded focus:border-orange-500 focus:outline-none focus:ring-0">
                                        Change Password
                                    </button>
                                    <Tooltip title={save ? 'Save your details' : 'Edit something to activate save'} color='black'>
                                        <button className={`bg-orange-500 ${save ? 'opacity-100' : 'opacity-50 cursor-not-allowed'} w-1/2 border-orange-500 border sm:w-1/6 text-white p-2 rounded focus:border-none focus:outline-none focus:ring-0`}
                                            onClick={() => {
                                                saveHandler()
                                            }}
                                            disabled={!save}
                                        >
                                            Save
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </PageWithNavbar>
    )
}

export default Profile

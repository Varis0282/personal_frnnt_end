import React, { useEffect, useState } from 'react'
import Field from '../../common/components/Feild/Feild';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import baseUrl from '../../config';
import { useNavigate } from 'react-router-dom';
import { PageWithNavbar } from '../../common/components';
import { setUser } from '../../redux/userReducer';

const Login = () => {
    const [user, setUserInLocal] = useState({ key: '', password: '' });
    const dispatch = useDispatch();
    const inputChangeHandler = (e) => {
        let { name, value } = e.target;
        if (name === 'email') {
            value = value.toLowerCase();
        }
        setUserInLocal({ ...user, [name]: value });
    }
    const navigate = useNavigate();
    const submitHandler = async () => {
        const { key, password } = user;
        if (key === '' || password === '') {
            // toast('Please fill all the fields', { type: 'error' });
            message.error('Please fill all the fields');
            return;
        }
        // if key has initial +91 then ask to enter the phone number without +91
        if (key.startsWith('+91')) {
            // toast('Please enter the phone number without country code', { type: 'error' });
            message.error('Please enter the phone number without country code');
            return;
        }
        dispatch(setLoading(true))
        try {
            const data = await axios.post(`${baseUrl}/api/auth/login`, user);
            if (data.data.success) {
                setUserInLocal({ key: '', password: '' });
                // toast('Logged in successfully', { type: 'success' });
                message.success('Logged in successfully');
                // save the token and user in the local storage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                dispatch(setUser(data.data.user));
                if (data.data.user.role === 'admin') {
                    dispatch(setLoading(false))
                    return navigate('/admin');
                }
                dispatch(setLoading(false))
                return data.data.user.mailVerified ? navigate('/') : navigate('/verify');
            }
        } catch (error) {
            console.log(error);
            // toast(error.response.data.message, { type: 'error' });
            message.error(error.response.data.message || 'Some error occured');
        }
        dispatch(setLoading(false))
    }

    useEffect(() => {
        // get the current location
        if (localStorage.getItem('token')) {
            return navigate('/');
        }
    }, [navigate]);

    return (
        <PageWithNavbar>
            <div className="flex flex-col justify-center items-center h-screen bg-white lg:px-0 md:px-0 px-4">
                <div className="flex flex-col justify-center items-center border-[1px] border-gray-400 lg:w-[22%] md:w-1/2 w-full gap-2 shadow bg-white p-6 rounded-md">
                    <h1 className="text-4xl font-bold p-2">Login</h1>
                    <Field
                        name={'key'}
                        label={'Email Id or Phone Number'}
                        placeHolder='Email or Phone Number'
                        value={user.key}
                        note="If you're using phone number, please don't enter the country code"
                        onKeyUp={(e) => e.key === 'Enter' && submitHandler()}
                        onChange={inputChangeHandler} />
                    <Field
                        name={'password'}
                        label={'Password'}
                        type='password'
                        placeHolder='Password'
                        value={user.password}
                        onChange={inputChangeHandler}
                        onKeyUp={(e) => e.key === 'Enter' && submitHandler()}
                    />
                    <div className="flex w-full justify-end">
                        <Link to={'/'} className='text-orange-500 font-semibold'>Forgot your password ?</Link>
                    </div>
                    <button className="bg-orange-500 w-full text-white p-2 rounded focus:border-none focus:outline-none focus:ring-0"
                        onClick={() => submitHandler()}
                    >
                        Login
                    </button>
                    <p className='font-medium'>Not registered yet ? Start your learning journey by <Link to={'/signup'} className='text-orange-500 font-semibold'>signing up</Link></p>
                </div>
            </div>
        </PageWithNavbar>
    )
}

export default Login

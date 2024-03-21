import React, { useEffect, useState } from 'react'
import Field from '../../common/components/Feild/Feild'
import { Link } from 'react-router-dom'
import baseUrl from '../../config';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { useNavigate } from 'react-router-dom';
import { PageWithNavbar } from '../../common/components';

const SignUp = () => {
    const [user, setUser] = useState({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '', });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputChangeHandler = (e) => {
        let { name, value } = e.target;
        if (name === 'email') value = value.toLowerCase();
        setUser({ ...user, [name]: value });
    }

    const submitHandler = async () => {
        if (user.password === '' || user.confirmPassword === '' || user.email === '' || user.firstName === '' || user.lastName === '') {
            // toast('Please fill all the fields', { type: 'error' });
            message.error('Please fill all the fields');
            return;
        }
        if (!passwordMatch) {
            // toast('Password does not match', { type: 'error' });
            message.error('Password does not match');
            return;
        }
        const newUser = { ...user, name: `${user.firstName} ${user.lastName}` };
        delete newUser.confirmPassword;
        delete newUser.firstName;
        delete newUser.lastName;
        console.log(newUser);
        dispatch(setLoading(true))
        try {
            const response = await axios.post(`${baseUrl}/api/auth/register`, newUser);
            if (response.data.success) {
                setUser({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '', phone: '' });
                // toast('Registered successfully', { type: 'success' });
                message.success('Registered successfully');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            // toast(error?.response?.data?.message || 'Some error occured', { type: 'error' });
            message.error(error?.response?.data?.message || 'Some error occured');
        }
        dispatch(setLoading(false))
    }

    useEffect(() => {
        if (user.password !== user.confirmPassword) {
            setPasswordMatch(false);
        }
        if (user.password === user.confirmPassword) {
            setPasswordMatch(true);
        }
        if (user.password === '' || user.confirmPassword === '') {
            setPasswordMatch(true);
        }
    }, [user.confirmPassword, user.password]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            return navigate('/');
        }
    }, [navigate]);

    return (
        <PageWithNavbar>
            <div className="flex flex-col justify-center items-center h-screen bg-white lg:px-0 md:px-0 px-4">
                <div className="flex flex-col justify-center items-center border-[1px] border-gray-400 lg:w-[22%] md:w-1/2 w-full gap-2 shadow bg-white p-6 rounded-md">
                    <h1 className="text-4xl font-bold p-2">Signup</h1>
                    <Field
                        name={'email'}
                        label={'Email Id'}
                        placeHolder='jayshreeram@ayodhya.com'
                        value={user.email}
                        onChange={inputChangeHandler}
                    />
                    <Field
                        name={'password'}
                        label={'Password'}
                        type='password'
                        placeHolder='shree ram bharose'
                        value={user.password}
                        onChange={inputChangeHandler}
                    />
                    <Field
                        name={'confirmPassword'}
                        label={'Confirm Password'}
                        type='password'
                        placeHolder='firse shree ram bharose'
                        value={user.confirmPassword}
                        onChange={inputChangeHandler}
                    />
                    {!passwordMatch &&
                        <p className='text-red-500 text-[10px] flex items-center gap-2 justify-end w-full font-medium'>
                            <i className="fa-solid fa-circle-info"></i>
                            Password does not match
                        </p>}
                    <div className="flex lg:flex-row md:flex-row lg:gap-0 md:gap-0 gap-2 flex-col w-full lg:ustify-between md:justify-between">
                        <div className="w-[48%]">
                            <Field
                                name={'firstName'}
                                label={'First Name'}
                                type='text'
                                placeHolder='Shree'
                                value={user.firstName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="w-[48%]">
                            <Field
                                name={'lastName'}
                                label={'Last Name'}
                                type='text'
                                placeHolder='Ram'
                                value={user.lastName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                    </div>
                    <Field
                        name={'phone'}
                        label={'Phone Number'}
                        type='number'
                        placeHolder='1081081081'
                        value={user.phone}
                        onChange={inputChangeHandler}
                        leftAddOn='+91'
                    />
                    <button className="bg-orange-500 w-full text-white p-2 rounded focus:border-none focus:outline-none focus:ring-0"
                        onClick={() => submitHandler()}
                    >
                        Sign up
                    </button>
                    <p className='font-medium'>Already registered with us ? Continue your learning journey by <Link to={'/login'} className='text-orange-500 font-semibold'>Loging in</Link></p>
                </div>
            </div>
        </PageWithNavbar>
    )
}

export default SignUp

import React, { useState } from 'react'
import Field from '../../common/components/Feild/Feild';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';

const Login = () => {
    const [user, setUser] = useState({ key: '', password: '' });
    const dispatch = useDispatch();
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const submitHandler = async () => {
        const { key, password } = user;
        if (key === '' || password === '') {
            toast('Please fill all the fields', { type: 'error' });
            return;
        }
        dispatch(setLoading(true))
        try {
            const data = await axios.post('https://nice-tick-onesies.cyclic.app/api/auth/login', user);
            console.log(data);
            toast('Logged in successfully', { type: 'success' });
        } catch (error) {
            console.log(error);
            toast(error.response.data.message, { type: 'error' });
        }
        dispatch(setLoading(false))
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white lg:px-0 md:px-0 px-4">
            <div className="flex flex-col justify-center items-center border-[1px] border-gray-400 lg:w-[22%] md:w-1/2 w-full gap-2 shadow bg-white p-6 rounded-md">
                <h1 className="text-4xl font-bold p-2">Login</h1>
                <Field
                    name={'key'}
                    label={'Email Id or Phone Number'}
                    placeHolder='Email or Phone Number'
                    value={user.key}
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
    )
}

export default Login

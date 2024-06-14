import React, { useEffect, useState } from 'react'
import { setLoading } from '../../redux/loaderReducer';
import baseUrl from '../../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Field from '../../common/components/Feild/Feild';
import { PageWithNavbar } from '../../common/components';
import { setUser } from '../../redux/userReducer';



const ChangePassword = () => {
    const [userData, setUserData] = useState({ email: '', otp: '' });
    const [password, setPassword] = useState({ oldPassword: '', newPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [otpSend, setOtpSend] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const getOTP = async () => {
        if (userData.email === '') {
            // toast('Please enter the email', { type: 'error' });
            message.error('Please enter the email');
            return;
        }
        if (userData?.email !== JSON.parse(localStorage.getItem('user'))?.email) {
            // toast('Please enter a valid email', { type: 'error' });
            message.error('Please enter a valid email');
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.post(`${baseUrl}/api/auth/send-otp-mail`, { email: userData.email });
            if (response.data.success) {
                // toast('OTP sent to your email', { type: 'success' });
                message.success('OTP sent to your email');
                setOtpSend(true);
            }
        } catch (error) {
            console.log(error);
            // toast(error?.response?.data?.message || 'Some error occured', { type: 'error' });
            message.error(error?.response?.data?.message || 'Some error occured');
        }
        dispatch(setLoading(false))
    }

    const verifyOtp = async () => {
        if (userData.otp === '') {
            // toast('Please enter the OTP', { type: 'error' });
            message.error('Please enter the OTP');
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.post(`${baseUrl}/api/auth/verify-email`, { email: userData.email, otp: userData.otp });
            if (response.data.success) {
                // toast('Email verified successfully', { type: 'success' });
                message.success('Email verified successfully');
                setUserData({ otp: '' });
                setOtpSend(false);
                setShowPassword(true);
            }
        } catch (error) {
            console.log(error);
            // toast(error?.response?.data?.message || 'Some error occured', { type: 'error' });
            message.error(error?.response?.data?.message || 'Some error occured');
        }
        dispatch(setLoading(false))
    }

    const changePassword = async () => {
        if (password.oldPassword === '' || password.newPassword === '') {
            // toast('Please enter the password', { type: 'error' });
            message.error('Please enter the password');
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.put(`${baseUrl}/api/me/change-password`, { oldPassword: password.oldPassword, newPassword: password.newPassword }, { headers });
            if (response.data.success) {
                // toast('Password changed successfully', { type: 'success' });
                message.success('Password changed successfully');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch(setUser(null));
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            // toast(error?.response?.data?.message || 'Some error occured', { type: 'error' });
            message.error(error?.response?.data?.message || 'Some error occured');
        }
        dispatch(setLoading(false))
    }

    return (
        <PageWithNavbar>
            <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
                <div className="flex flex-col items-center border-[1px] justify-start border-gray-400 w-full gap-2 shadow bg-white p-6 rounded-md">
                    <p className="flex text-orange-500 font-semibold text-3xl justify-start w-full">
                        Veify mail to change your password
                    </p>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex w-1/2 justify-start">
                            <Field
                                name='email'
                                label='Email Id'
                                type='email'
                                placeHolder='Email your email to verify your account'
                                value={userData.email}
                                onChange={inputChangeHandler}
                                onKeyUp={(e) => e.key === 'Enter' && getOTP()}
                            />
                        </div>
                        <div className="flex w-1/2 justify-start">
                            {!otpSend && <button className='bg-orange-500 px-4 py-1 text-white rounded' onClick={() => getOTP()}>Get OTP</button>}
                        </div>
                        {otpSend &&
                            <div className="flex w-1/2 justify-start">
                                <Field
                                    name='otp'
                                    label='OTP'
                                    type='number'
                                    placeHolder='Enter the OTP sent to your email'
                                    value={userData.otp}
                                    onChange={inputChangeHandler}
                                    onKeyUp={(e) => e.key === 'Enter' && verifyOtp()}
                                />
                            </div>
                        }
                        {otpSend &&
                            <div className="flex w-1/2 justify-start">
                                <button className='bg-orange-500 px-4 py-1 text-white rounded' onClick={() => verifyOtp()}>Verify</button>
                            </div>
                        }
                        {showPassword &&
                            <div className="flex w-1/2 justify-start">
                                <Field
                                    name='oldPassword'
                                    label='Old Password'
                                    type='password'
                                    placeHolder='Enter your old password'
                                    value={password.oldPassword}
                                    onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                                    onKeyUp={(e) => e.key === 'Enter' && changePassword()}
                                />
                            </div>
                        }
                        {showPassword &&
                            <div className="flex w-1/2 justify-start">
                                <Field
                                    name='newPassword'
                                    label='New Password'
                                    type='password'
                                    placeHolder='Enter your new password'
                                    value={password.newPassword}
                                    onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                    onKeyUp={(e) => e.key === 'Enter' && changePassword()}
                                />
                            </div>
                        }
                        {showPassword &&
                            <div className="flex w-1/2 justify-start">
                                <button className='bg-orange-500 px-4 py-1 text-white rounded' onClick={() => changePassword()}>Change Password</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </PageWithNavbar>
    )
};

export default ChangePassword;
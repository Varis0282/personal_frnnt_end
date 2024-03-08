import React, { useEffect, useState } from 'react'
import { setLoading } from '../../redux/loaderReducer';
import baseUrl from '../../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Field from '../../common/components/Feild/Feild';
import { PageWithNavbar } from '../../common/components';

const VerifyEmail = () => {
    const [user, setUser] = useState({ email: '', otp: '' });
    const [otpSend, setOtpSend] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const userData = JSON.parse(localStorage.getItem('user'));

    const getOTP = async () => {
        if (user.email === '') {
            // toast('Please enter the email', { type: 'error' });
            message.error('Please enter the email');
            return;
        }
        if (user.email !== JSON.parse(localStorage.getItem('user')).email) {
            // toast('Please enter a valid email', { type: 'error' });
            message.error('Please enter a valid email');
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.post(`${baseUrl}/api/auth/send-otp-mail`, { email: user.email });
            console.log(response);
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
        if (user.otp === '') {
            // toast('Please enter the OTP', { type: 'error' });
            message.error('Please enter the OTP');
            return;
        }
        dispatch(setLoading(true));
        try {
            const response = await axios.post(`${baseUrl}/api/auth/verify-email`, { email: user.email, otp: user.otp });
            console.log(response);
            if (response.data.success) {
                // toast('Email verified successfully', { type: 'success' });
                message.success('Email verified successfully');
                setUser({ email: '', otp: '' });
                setOtpSend(false);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
        } catch (error) {
            console.log(error);
            // toast(error?.response?.data?.message || 'Some error occured', { type: 'error' });
            message.error(error?.response?.data?.message || 'Some error occured');
        }
        dispatch(setLoading(false))
    }

    useEffect(() => {
        if (userData.mailVerified) {
            navigate('/')
        }
    }, [userData.mailVerified, navigate]);

    return (
        <PageWithNavbar>
            <div className="flex flex-col justify-center items-center h-screen bg-white px-4">
                <div className="flex flex-col items-center border-[1px] justify-start border-gray-400 w-full gap-2 shadow bg-white p-6 rounded-md">
                    <p className="flex text-orange-500 font-bold text-xl justify-start w-full">
                        Oops ! You need to verify your email first. Please check your email and click on the link to verify your email.
                    </p>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex w-1/2 justify-start">
                            <Field
                                name='email'
                                label='Email Id'
                                type='email'
                                placeHolder='Email your email to verify your account'
                                value={user.email}
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
                                    value={user.otp}
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
                    </div>
                </div>
            </div>
        </PageWithNavbar>
    )
}

export default VerifyEmail

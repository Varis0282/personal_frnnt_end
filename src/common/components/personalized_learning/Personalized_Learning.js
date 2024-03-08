import React from 'react'
import Lottie from 'lottie-react';
import { Personalized_ex } from '../../animation';

const Personalized_Learning = () => {
    return (
        <div className="flex w-full md:flex-row flex-col justify-center items-center px-4">
            <div className="md:w-2/5 w-full md:flex order-1 items-center justify-center">
                <Lottie
                    animationData={Personalized_ex}
                    loop={true}
                    autoplay={true}
                />
            </div>
            <div className="md:w-2/4 w-full flex flex-col order-2 md:pl-12 md:pr-6 px-2 py-2 gap-3">
                <p className='text-lg font-medium'>You can have <span className="text-orange-500">direct</span></p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'><span className="text-orange-500">Interaction</span> with <span className="text-orange-500">Your Mentor Anytime</span></p>
                <p className='text-lg font-medium'>just to discuss about</p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'>Your <span className="text-orange-500">Career, Growth, Learning Capabilities</span> and many more...</p>
                <p className='text-lg font-medium'>Never hesistate to ask from <span className="text-orange-500">Your Personal Guru</span></p>
            </div>
        </div>
    )
}

export default Personalized_Learning

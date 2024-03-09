import React from 'react'
import Lottie from 'lottie-react';
import { Live_Classes } from '../../animation';

const Live = () => {
    return (
        <div className="flex w-full md:flex-row flex-col justify-center items-center px-4 mt-8">
            <div className="md:w-2/5 w-full md:flex order-1 md:order-2 items-center justify-center" id='live-classes'>
                <Lottie
                    animationData={Live_Classes}
                    loop={true}
                    autoplay={true}
                />
            </div>
            <div className="md:w-2/4 w-full order-2 md:order-1 flex flex-col md:pl-12 md:pr-6 px-2 py-2 gap-3">
                <p className='text-lg font-medium'>No don't need to watch those <span className="text-orange-500">boring tutorials</span> because you have</p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'><span className="text-orange-500">Live CLasses</span> with <span className="text-orange-500">Recordings,</span></p>
                <p className='text-lg font-medium'>so that you can have</p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'><span className="text-orange-500">Interaction</span> with <span className="text-orange-500">Your Mentor</span></p>
                <p className='text-lg font-medium'>And that too with <span className="text-orange-500">flexible timimngs...</span></p>
            </div>
        </div>
    )
}

export default Live

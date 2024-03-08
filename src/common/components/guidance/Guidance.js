import React from 'react'
import Lottie from 'lottie-react';
import { Guidance } from '../../animation';

const Internship_Guidance = () => {
    return (
        <div className="flex w-full md:flex-row flex-col justify-center items-center px-4">
            <div className="md:w-2/4 w-full order-2 flex flex-col md:pl-12 md:pr-6 px-2 py-2 gap-3">
                <p className='text-lg font-medium'>Get <span className="text-orange-500">guidance </span> from</p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'><span className="text-orange-500">Industry </span>experts working on Leading<span className="text-orange-500"> MNCs</span>{'🤫'}</p>
                <p className='text-lg font-medium'>and that too, not for <span className="text-orange-500">once</span> , not even  <span className="text-orange-500">twice</span></p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'><span className="text-orange-500">Every </span>Week</p>
                <p className='text-lg font-medium'><span className="text-orange-500">Tune</span> up with <span className="text-orange-500">Industry</span> Mentors <span className="text-orange-500">every</span> week to know Industry <span className="text-orange-500">Trends</span></p>
            </div>
            <div className="md:w-2/5 w-full md:flex order-1 items-center justify-center">
                <Lottie
                    animationData={Guidance}
                    loop={true}
                    autoplay={true}
                />
            </div>
        </div>
    )
}

export default Internship_Guidance

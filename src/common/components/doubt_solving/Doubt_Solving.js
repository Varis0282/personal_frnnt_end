import React from 'react'
import Lottie from 'lottie-react';
import { Doubt_solving } from '../../animation';

const Doubt_Solving = () => {
    return (
        <div className="flex w-full md:flex-row flex-col justify-center items-center px-4">
            <div className="md:w-2/4 w-full flex flex-col order-2 md:pl-12 md:pr-6 px-2 py-2 gap-3">
                <p className='text-lg font-medium'>No don't need to wait for their <span className="text-orange-500">late solutions</span> because you have</p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'><span className="text-orange-500">Instant Doubt Solving</span> Anytime, Anywhere, <span className="text-orange-500">Anyhow</span></p>
                <p className='text-lg font-medium'>No matter how silly or tricky your doubt is</p>
                <p className='md:text-5xl text-3xl leading-[1.3] font-medium'>We'll resolve it <span className="text-orange-500">Instanly</span></p>
                <p className='text-lg font-medium'>Either on our portal , whatsapp , call or online meet</p>
            </div>
            <div className="md:w-2/5 w-full md:flex order-1 items-center justify-center">
                <Lottie
                    animationData={Doubt_solving}
                    loop={true}
                    autoplay={true}
                />
            </div>
        </div>
    )
}

export default Doubt_Solving

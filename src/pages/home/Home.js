import React from 'react';
import { DoubtSolving, Guidance, Live, PageWithNavbar, PersonalizedLearning } from '../../common/components';
import { Developer } from '../../common/animation';
import Lottie from 'lottie-react';
import { Divider } from 'antd';

const Home = () => {

  const handleHowItWorks = () => {
    const element = document.getElementById('live-classes');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <PageWithNavbar>
      <div className="flex w-full flex-col">
        {/* Top Section */}
        <div className="flex px-4 md:pl-36 my-4 mt-12">
          <p className="text-4xl border-2 border-[#f9741641] p-4 rounded-3xl border-x-0">Get your Personal Guru</p>
        </div>
        <div className="flex w-full md:flex-row flex-col justify-center items-center px-4">
          <div className="md:w-2/4 w-full flex flex-col order-2 md:pl-12 md:pr-6 px-2 py-2 gap-3">
            <p className='text-lg font-medium'><span className="text-orange-500">Only</span> program with</p>
            <p className='md:text-5xl text-3xl leading-[1.3] font-medium'><span className='text-orange-500'>Live</span> Classes, <span className='text-orange-500'>Instant</span> Doubt Solving, <span className="text-orange-500">Personalized</span> Learning, <span className="text-orange-500">Internship</span> Guidance</p>
            <p className='text-lg font-medium'>and <span className="text-orange-500">much more...</span></p>
          </div>
          <div className="md:w-2/5 w-full md:flex order-1 items-center justify-center">
            <Lottie
              animationData={Developer}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center p-4 mt-6">
          <button className='bg-orange-500 px-6 py-1 text-white rounded text-lg font-medium'
            onClick={handleHowItWorks}
          >
            How it works ?
          </button>
        </div>
        <Divider type='horizontal' />
        <Live />
        <Divider type='horizontal' />
        <DoubtSolving />
        <Divider type='horizontal' />
        <PersonalizedLearning />
        <Divider type='horizontal' />
        <Guidance />
        <Divider type='horizontal' />
      </div>
    </PageWithNavbar>
  )
}

export default Home

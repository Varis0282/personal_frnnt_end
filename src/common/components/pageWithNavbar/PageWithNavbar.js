import React from 'react'
import { Navbar } from '../navbar'

const PageWithNavbar = ({ children }) => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='pt-16'>
                {children}
            </div>
        </div>
    )
}

export default PageWithNavbar

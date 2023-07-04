import React from 'react'
import imgTech from '../../../public/img/tecnical_test.jpg';
import { Link } from '@inertiajs/inertia-react';
import "../../css/guest.css";

export const GuestLayout = ({children}) => {
  return (
    
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div>
            <img src={imgTech} className="img_tech" />
    </div>

    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-transparent overflow-hidden sm:rounded-lg">
      
        {children}
    </div>
</div>
  )
}



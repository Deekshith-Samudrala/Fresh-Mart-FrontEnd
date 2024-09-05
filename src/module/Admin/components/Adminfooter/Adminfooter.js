import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminkeyword } from '../../../../constants/Adminurl';

const Adminfooter = () => {
  
    let [pin,setPin] = useState('');

    let navigate = useNavigate();

    //get the admin details from admin store
    let adminDetails = useSelector(state=>state.adminDetailsSlice);

    //if admin is not authenticated navigate to login
    if(!adminDetails.isAuthenticated){
        navigate(`/admin${adminkeyword}/login`)
    }

    useEffect(() => {
        if (adminDetails.adminInfo) {
            //set the pin of the admin
            setPin(adminDetails.adminInfo); 
        }
    }, [adminDetails.adminInfo]);

    return (
        <>
            <div className='text-center h3 text-secondary'>Logged into Admin - <b>{pin}</b></div>
        </>
    )
}

export default Adminfooter
import React, { useEffect, useState } from 'react';
import Userservice from '../../../../services/Userservice';
import { useNavigate } from 'react-router-dom';
import { adminkeyword } from '../../../../constants/Adminurl';
import Delmodal from '../../../../constants/Delmodal';
import { useDispatch } from 'react-redux';
import {userdeletecartremove} from "../../../../Redux/Cartslice";
import { useSelector } from 'react-redux';

const Userlist = () => {

    let navigate = useNavigate();
    let disp = useDispatch();

    let [userdetails,setUserdetails] = useState([]);
    let [selecteduser,setSelecteduser] = useState({});

    const loggedInAdminDetails = useSelector((state)=>state.adminDetailsSlice)

    useEffect(()=>{
        if(localStorage.getItem("admintoken")){
            let getuserdata = async ()=>{
                let result = await Userservice.getallusersdata();
                setUserdetails(result.users);
            }
            getuserdata();
        }
        else{
            navigate(`admin${adminkeyword}/login`)
        }
    },[]);

    let askdeleteuser = async (user)=>{
        setSelecteduser(user);        
    }

    let confdelete = async()=>{
        let result = await Userservice.deluser(selecteduser._id,loggedInAdminDetails.accessToken);
        // disp(userdeletecartremove(selecteduser._id));
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-10 offset-md-1'>
                        <div className='text-center my-5'><h3><b><u>User Details</u></b></h3></div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <table className='table table-hover table-dark table-striped'>
                                    <thead>
                                        <tr>
                                            <td>SLNO</td>
                                            <td>User name</td>
                                            <td>E-Mail</td>
                                            <td>Address</td>
                                            <td>Gender</td>
                                            <td>State</td>
                                            <td>City</td>
                                            <td>Contact</td>
                                            <td>Delete</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userdetails.map((user,index)=>{
                                                return(
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.address}</td>
                                                            <td>{user.gender}</td>
                                                            <td>{user.state}</td>
                                                            <td>{user.city}</td>
                                                            <td>{user.contact}</td>
                                                            <td><button className='btn btn-danger btn-sm' onClick={()=>askdeleteuser(user)} data-toggle="modal" data-target="#delmodal">Delete</button></td>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Delmodal dispselectedcate={selecteduser.name} confirmdelete={confdelete}></Delmodal>
        </>
    )
}

export default Userlist
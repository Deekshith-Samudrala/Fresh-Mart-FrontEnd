import axios from "axios";
import { api } from "../constants/serverapi";

let getstate = async()=>{
    let result = await axios.get(`${api}/city/state`);
    return result.data;
}

let getcity = async(statename) => {

    let result = await axios.get(`${api}/city/getcity`, {params: { stateName: statename }});

    return result.data;
}

let userdata = async(userdata)=>{
    let result = await axios.post(`${api}/user/signup`,userdata);
    return result.data;
}

let updateuserdata = async(data,userid)=>{
    let result = await axios.put(`${api}/user/update/details`,{...data,_id : userid});
    return result.data;
}

let updatepassword = async(data,userid,accessToken) => {
    let result = await axios.put(`${api}/user/password/reset`,{...data,_id : userid},{
        headers : {
            Authorization: `Bearer ${accessToken}`,  // Set the Authorization header
            'Content-Type': 'application/json'  // Add any additional headers if needed
        }
    });
    return result.data;
}

let getallusersdata = async()=>{
    let result = await axios.get(`${api}/user/getAllUsers`);
    return result.data;
}

let deluser = async(userid) => {
    let result = await axios.delete(`${api}/user/delete/${userid}`);
    return result.data;
}

export default {getstate, getcity, userdata, updateuserdata, updatepassword, getallusersdata, deluser};
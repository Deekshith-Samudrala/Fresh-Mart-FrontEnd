import axios from "axios";
import { api } from "../constants/serverapi";

let getuserprofiledata = async (accessToken)=>{

    let result = await axios.get(`${api}/user/data/token`,{

        headers: {

            Authorization: `Bearer ${accessToken}`

        }});

    return result.data;

}

let checklogin = async (data)=>{
    let result = await axios.post(`${api}/user/login`,data);
    return result.data;
}

let getuserdatabyid = async (userid)=>{
    let result = await axios.get(`${api}/user/userId/${userid}`);
    return result.data;
}

let getuserbyname = async(username)=>{
    let result = await axios.get(`${api}/user/profile/userdeetbyname/${username}`);
    return result.data;
}

export default {getuserprofiledata, checklogin, getuserdatabyid,getuserbyname}
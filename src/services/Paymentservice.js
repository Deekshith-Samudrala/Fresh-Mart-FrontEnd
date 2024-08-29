import axios from "axios";
import { api } from "../constants/serverapi";

const placeorder = async(orderdata)=>{
    let result = await axios.post(`${api}/payment/createOrder`,orderdata);
    return result.data;
}

const verifyorder = async(responsedata)=>{
    let result = await axios.post(`${api}/payment/verifyOrder`,responsedata);
    return result.data;
}

export default {placeorder, verifyorder};
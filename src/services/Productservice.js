import axios from 'axios';
import { api } from '../constants/serverapi';

let Add = async (obj) => {
    let result = await axios.post(`${api}/product/addProduct`,obj);
    return result.data;
}

let getall = async ()=>{
    let result = await axios.get(`${api}/product/getAll`);
    return result.data;
}

let getone = async (id)=>{
    let result = await axios.get(`${api}/product/getProduct/${id}`);
    return result.data;
}

let getproducts = async(cateid,subcateid)=>{
    let result = await axios.get(`${api}/product/${cateid}/${subcateid}`);
    return result.data;
}

let getproductbycategory = async(cateid)=>{ // get products of a particular category by cateid
    let result = await axios.get(`${api}/product/cate/${cateid}`);
    return result.data;
}

let getproductbysubcategory = async(subcateid)=>{
    let result = await axios.get(`${api}/product/subcate/${subcateid}`);
    return result.data;
}

let Deletebyid = async (id)=>{
    let result = await axios.delete(`${api}/product/delete/id/${id}`);
    return result.data;
}

let update = async (id,data)=>{
    let result = await axios.put(`${api}/product/${id}`,data);
    return result.data;
}


export default {Add, getall, getone, getproductbycategory,getproductbysubcategory, Deletebyid, update, getproducts}
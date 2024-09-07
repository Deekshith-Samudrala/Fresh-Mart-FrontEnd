import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Categoryservice from "../../../../services/Categoryservice";
import Productservice from "../../../../services/Productservice"
import { useNavigate, useParams } from 'react-router-dom';
import { adminkeyword } from '../../../../constants/Adminurl';

const Productadd = () => {
  const file = useRef(); // Reference for file input
  const navigate = useNavigate();
  const params = useParams();

  const [cate, setCate] = useState([]);
  const [subcate, setSubcate] = useState([]);
  const [title, setTitle] = useState("Add New");
  const [submitbtn, setSubmitbtn] = useState("Add");
  const [updtproduct, setUpdtproduct] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0); // To track progress of upload
  const [uploading, setUploading] = useState(false); // To disable button during upload

  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      if (params.productid) {
        setTitle("Update");
        setSubmitbtn("Update");
        const getproductdeets = async () => { // get product details form the params id
          let result = await Productservice.getone(params.productid);
          setUpdtproduct(result.info[0]);
        }
        getproductdeets();
      } else {
        const getcate = async () => {
          let result = await Categoryservice.getall();
          setCate(result.info);
        }
        getcate();
      }
    } else {
      navigate(`/admin${adminkeyword}`);
    }
  }, []);

  const getsubcate = async (e) => {
    handleChange(e);

    if (e.target.value) {
      let result = await Categoryservice.getcate(e.target.value);
      setSubcate(result.info[0].subcategory);
    }
  }

  const productschema = yup.object({
    title: yup.string().required("Enter Title of the Product"),
    price: yup.number().required("Enter the Price of the Product"),
    details: yup.string().required("Enter the Details of the Product"),
    image: yup.string().required("Select the Image of the Product"),
    category: yup.string().required("Select the Category of the Product"),
    subcategory: yup.string().required("Select the Sub-Category of the Product"),
    quantity: yup.number().required("Enter the Quantity of the Product"),
    discount: yup.number().required("Enter the Discount on the Product")
  });

  const { handleChange, handleSubmit, errors, touched, values, setFieldValue } = useFormik({
    initialValues: {
      title: updtproduct.title || "",
      price: updtproduct.price || "",
      details: updtproduct.details || "",
      image: updtproduct.image || "",
      category: updtproduct.category || "",
      subcategory: updtproduct.subcategory || "",
      quantity: updtproduct.quantity || "",
      discount: updtproduct.discount || ""
    },
    onSubmit: async (formdata) => {
      setUploading(true); // Set upload state to true
      if (params.productid) {
        let result = await Productservice.update(params.productid, formdata);
        navigate(`/admin${adminkeyword}/product/list`);
      } else {
        // Create new product with image upload
        let frm = new FormData();
        
        // Append the file (image)
        frm.append("file", file.current.files[0]);
        frm.append("data", JSON.stringify(formdata));

        // Track upload progress
        let result = await Productservice.Add(frm, {
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || 1;
            const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
            setUploadProgress(percentCompleted); // Update progress bar
          }
        });

        if (result.success) {
          navigate(`/admin${adminkeyword}/product/list`);
        } else {
          console.error("Error uploading the product", result.error);
        }
      }
      setUploading(false); // Upload finished
    },
    validationSchema: productschema,
    enableReinitialize: true
  });

  // Client-side validation for file size and type
  const handleFileChange = (e) => {
    const fileObj = e.target.files[0];
    if (fileObj) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(fileObj.type)) {
        alert("Invalid file type. Please upload JPEG, PNG, or GIF.");
        file.current.value = ''; // Clear file input
        return;
      }

      // Validate file size (limit 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (fileObj.size > maxSize) {
        alert("File size exceeds 5MB. Please upload a smaller file.");
        file.current.value = ''; // Clear file input
        return;
      }

      // Update formik value for image
      setFieldValue("image", fileObj.name);
    }
  };

  return (
    <>
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <h3 className='text-center'>{title} Product</h3>
            <div className="form-group">
              <label>Title</label>
              <input value={values.title} className={'form-control ' + (errors.title && touched.title ? "is-invalid" : "")} onChange={handleChange} name="title" type="text"></input>
              <small className='text-danger'>
                  {(errors.title && touched.title) ? errors.title : ""}
                </small>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input value={values.price} className={'form-control ' + (errors.price && touched.price ? "is-invalid" : "")} onChange={handleChange} name="price" type="number"></input>
              <small className='text-danger'>
                  {(errors.price && touched.price) ? errors.price : ""}
                </small>
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea value={values.details} className={'form-control ' + (errors.details && touched.details ? "is-invalid" : "")} onChange={handleChange} name="details"></textarea>
              <small className='text-danger'>
                  {(errors.details && touched.details) ? errors.details : ""}
                </small>
            </div>
            {/* Image Upload */}
            <div className="form-group">
              <label>Image</label>
              {
                Object.keys(updtproduct).length ?
                  (
                    <input disabled value={values.image} type="text" className='form-control'></input>
                  )
                  : (
                    <>
                      <input className={'form-control ' + (errors.image && touched.image ? "is-invalid" : "")} onChange={(e) => { handleFileChange(e); handleChange(e); }} name="image" type="file" ref={file}></input>
                      <small className='text-danger'>
                          {(errors.image && touched.image) ? errors.image : ""}
                        </small>
                    </>
                  )
              }
            </div>
            <div className="form-group">
                <label>Category</label>
                { cate.length ?
                    (<select onChange={(e)=>getsubcate(e)} className={'form-control ' + (errors.category && touched.category ? "is-invalid" : "")} name="category">
                      <option value=''>Select Category</option>
                      {
                        cate.map((cate)=>{
                          return(
                            <option value={cate._id} key={cate._id}>{cate.name}</option>
                          )
                        })
                      }
                    </select>)
                   : 
                   (<input disabled value={values.category} onChange={handleChange} name="category" className={'form-control ' + (errors.category && touched.category ? "is-invalid" : "")}></input>)
                }
                <small className='text-danger'>
                  {(errors.category && touched.category) ? errors.category : ""}
                </small>
              </div>
              <div className="form-group">
                <label>Sub-Category</label>
                { cate.length ? 
                    (<select className={'form-control ' + (errors.subcategory && touched.subcategory ? "is-invalid" : "")} onChange={handleChange} name="subcategory">
                    <option value="">Select Sub-Category</option>
                    {
                      subcate.map((subcate)=>{
                        return(
                        <option key={subcate._id} value={subcate._id}>{subcate.name}</option>
                        )
                      })
                    }
                    </select>)
                   :  
                    (
                      <input disabled value={values.subcategory} onChange={handleChange} name="subcategory" className={'form-control ' + (errors.subcategory && touched.subcategory ? "is-invalid" : "")}></input>
                    )   
                }
                <small className='text-danger'>
                  {(errors.subcategory && touched.subcategory) ? errors.subcategory : ""}
                </small>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input value={values.quantity} className={'form-control ' + (errors.quantity && touched.quantity ? "is-invalid" : "")} onChange={handleChange} type="number" name="quantity"></input>
                <small className='text-danger'>
                  {(errors.quantity && touched.quantity) ? errors.quantity : ""}
                </small>
              </div>
              <div className="form-group">
                <label>Discount</label>
                <input value={values.discount} className={'form-control ' + (errors.discount && touched.discount ? "is-invalid" : "")} onChange={handleChange} type="number" name="discount"></input>
                <small className='text-danger'>
                  {(errors.discount && touched.discount) ? errors.discount : ""}
                </small>
              </div>
            {/* Display upload progress */}
            {uploading && (
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}>
                  {uploadProgress}%
                </div>
              </div>
            )}
            <button className='btn btn-success' type="submit" disabled={uploading}>{submitbtn}</button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default Productadd;
import React, { useState } from 'react'
import { addPost } from '../api/postApi';

 export const Form = ({data,setData}) => {

  const [addData,setAddData] = useState({
    title : "",
    body  : "",
  });

  const handleInputChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value; 
    setAddData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const addpostdata = async ()=>{
     const res = await addPost(addData)
     console.log("res",res);
     

     if(res.status === 201 ){
      setData([...data,res.data])
      setAddData({title: "", body: ""})
     }
  }
  const handleFormSubmit = (e)=>{
    e.preventDefault();
    addpostdata();
  }
  return (
    <form onSubmit={handleFormSubmit}>
        <div>
            <label htmlFor="title"></label>
            <input
             type= "text" 
             autoComplete='off'
             id='title'
             name='title'
             placeholder='title'
             value={addData.title}
             onChange={handleInputChange}
            
            />
        </div>

        <div>

            <label htmlFor="body"></label>

            <input type="text" 
                  name="body" 
                  autoComplete='off'
                  placeholder='add post'
                  id="body" 
                  value={addData.body}
                  onChange={handleInputChange}
                  />

                   
        </div>
        <button type='submit'>Add</button>
    </form>
   
  )
}

export default Form

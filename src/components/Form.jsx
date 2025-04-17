import React, { useEffect, useState } from 'react'
import { addPost, updateData } from '../api/postApi';

 export const Form = ({data,setData,updateDataApi, setUpadateDataApi}) => {

  const [addData,setAddData] = useState({
    title : "",
    body  : "",
  });

  // let isEmpty = addData.title === "" && addData.body === "";
  // let isEmpty = Object.keys(updateDataApi).length === 0;
  // get the updated data and add into input field


  let isEmpty = !updateDataApi || 
  (Object.keys(updateDataApi).length === 0 || 
  (updateDataApi.title === "" && updateDataApi.body === ""));

// useEffect(()=>{
//   updateDataApi && setAddData({
//     title: updateDataApi.title || "",
//     body: updateDataApi.body || "",
//   })
// } ,[updateDataApi])


useEffect(() => {
  if (updateDataApi && Object.keys(updateDataApi).length > 0) {
    console.log("Updating addData with:", updateDataApi);
    setAddData({
      title: updateDataApi.title || "",
      body: updateDataApi.body || "",
    });
  }
}, [updateDataApi]);



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

  // updatePostData

  const updatePostData = async() =>{
    console.log("reachable");
    
    try {
      const res = await updateData( updateDataApi.id,addData)
    console.log(res);

    // prev has all the set data
    if(res.status === 200){
      setData((prev)=>{
        console.log("prev data :  ")  
        return prev.map((curElem)=>{
          return curElem.id === res.data.id ? res.data : curElem;
        });
      });
      setAddData({title: "", body : ""});
      setUpadateDataApi({});
    }
    } catch (error) {
      console.log(error)
    }
    
  }





  // form submisson 
  // const handleFormSubmit = (e)=>{
  //   e.preventDefault();
  //   const action = e.nativeEvent.submitter.value;
  //   console.log("Action triggered:", action);
  //   if(action === "Add"){
  //     addpostdata();
  //   } else if(action === "Edit") {
  //     updatePostData();
  //   }
  // }


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    console.log("Action triggered:", action);
    console.log("Current addData:", addData);
    console.log("isEmpty (inside submit):", isEmpty);
    if (action === "Add") {
      addpostdata();
    } else if (action === "Edit") {
      updatePostData();
    }
  };





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
        {/* <button type='submit' value={isEmpty ? "Add" : "Edit"}>
          {isEmpty ? "Add" : "Edit"}
          </button> */}


<button type="submit" value={isEmpty ? "Add" : "Edit"}>
  {console.log("Button text:", isEmpty ? "Add" : "Edit")}
  {isEmpty ? "Add" : "Edit"}
</button>
    </form>
   
  )
}

export default Form

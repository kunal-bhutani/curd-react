import React, { useState,useEffect } from 'react'
import { deletePost, getPosts } from '../api/postApi'
import "../App.css"
import Form from './Form'


const Posts = () => {
    
    const[data,setData] = useState([])

    const getPostData = async()=>{
        const res = await getPosts()
        console.log(res.data);
        setData(res.data)
        
      }
    
    useEffect(()=>{
      getPostData()
    },[])

    // to delete the post

    const handleDeletePost = async(id)=>{
        const res = await deletePost(id);
        try {
            if(res.status === 200){
                const newData = data.filter((currEle)=>{
                    return currEle.id !== id;
                })
                setData(newData)
            } else {
                console.log("fail to delete the response", res.status)
            }
        } catch (error) {
            console.log(error);
            
        }
        
        console.log(res.data);
        
        
    }
  return (
    <>
    <section className='section-form'>
    <Form data = {data} setData ={setData}/>
    </section>
    <section className="section-post">
            <ol>
                {data.map((currEle)=>{
                    const{id,body,title} = currEle;   // destructure
                    return <li key={id}>
                        <p>Title: {title}</p>
                        <p>Body: {body}</p>
                        <button>edit</button>
                        <button className='btn-delete' onClick={()=>{handleDeletePost(id)}}>delete</button>

                    </li>
                })}
            </ol>
    </section>
    </>
  )
}

export default Posts

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewBlog = () => {

  const [title, setTitle] = useState('');
  const [description,setDescription] = useState('');
  const navigate = useNavigate();

  const handleFormData = (event) => {
    try {
      event.preventDefault();
      let newDate = new Date();
      let formattedDate = newDate.toTimeString().slice(0,5);
      const data = {
        title,
        description,
        date: formattedDate
      }
      const res = axios.post('/api/blogs',data)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='m-4 p-2'>
        <h1 className='text-2xl text-bold text-center'>Create a New Blog</h1>
      </div>
      <div>
        <form onSubmit={ handleFormData } className='w-full flex flex-col justify-center items-center p-4'>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder='Add New Chat' id='title' value={title} onChange={(event) => { setTitle(event.target.value) }} className='w-full lg:w-1/3 flex items-center h-8 p-2 my-2 rounded-md'/>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={description} onChange={(event) => {setDescription(event.target.value)}} className='w-full lg:w-1/3 flex items-center h-44 p-2 my-2 rounded-md'></textarea>
          <button className='w-32 h-12 bg-black text-white text-center rounded-md'>Add Blog</button>
        </form>
      </div>
    </div>
  )
}

export default NewBlog
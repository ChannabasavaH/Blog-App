import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const UpdateBlog = () => {

  const [title, setTitle] = useState('');
  const [description,setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/blogs/${id}`);
      setTitle(res.data.title)
      setDescription(res.data.description);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  },[id])

  const handleFormData = (event) => {
    try {
      event.preventDefault();
      let newDate = new Date();
      let formattedDate = newDate.toTimeString().slice(0,5);
      console.log(formattedDate);
      const data = {
        title,
        description,
        editedTime: formattedDate
      }
      console.log(data);
      const res = axios.put(`/api/blogs/${id}/edit`,data)
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=''>
      <div className='m-4 p-2'>
        <h1 className='text-2xl text-bold text-center'>Edit Your Blog</h1>
      </div>
      <div>
        <form onSubmit={ handleFormData } className='w-full flex flex-col justify-center items-center p-4'>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder='Add New Chat' id='title' value={title} onChange={(event) => { setTitle(event.target.value) }} className='w-full lg:w-1/3 flex items-center h-8 p-2 m-2 rounded-md' />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={description} onChange={(event) => {setDescription(event.target.value)}} className='w-full lg:w-1/3 flex items-center h-44 p-2 m-2 rounded-md'></textarea>
          <button className='w-32 h-12 bg-black text-white text-center rounded-md'>Edit Blog</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateBlog
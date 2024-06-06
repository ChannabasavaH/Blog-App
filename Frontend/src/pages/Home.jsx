import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/blogs')
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleDelete = async (blogId) => {
    try {
      const res = await axios.delete(`/api/blogs/${blogId}/delete`)
      setBlogs(blogs.filter(blogs => blogs._id !== blogId));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='mt-4'>
        <Link to={'/api/blogs'}>
          <button className='w-60 h-12 rounded-md border-2 border-white bg-black text-white text-center'>Add New Blog</button>
        </Link>
      </div>
      <div className='w-full flex flex-wrap sm:justify-evenly'>
        {blogs.map((data) => (
          <div key={data._id} className='w-full md:w-1/3 lg:w-1/4 flex flex-col justify-center border-2 border-black rounded-md m-2 p-2'>
            <h1 className='m-2 text-md text-center text-2xl'>{data.title}</h1>
            <hr />
            <p className='text-center m-2'>{data.description}</p>
            <div className='flex justify-end items-center m-2'>
              {data.editedTime ? (
                <p className='text-sm opacity-90'>Edited on: {data.editedTime}</p>
              ) : (
                <p className='text-sm opacity-90'>Posted on: {data.date}</p>
              )}
            </div>
            <div className='flex justify-between items-center m-2'>
              <Link to={`/api/blogs/${data._id}/edit`} className='text-green-500'>Edit</Link>
              <button onClick={() => { handleDelete(data._id) }} className='text-red-500'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
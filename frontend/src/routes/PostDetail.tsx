import React, { useEffect, useState } from 'react'

import { Loading } from '../components';
import { PostProp } from '../../types/types';
import { useParams } from "react-router-dom";

const PostDetail = () => {
  // Declaration
  const { id } = useParams();

  // UseStates
  const [post, setPost] = useState<PostProp>()

  const [fetchError, setFetchError] = useState(false)
  const [loading, setLoading] = useState(true);



  // UseEffects
  useEffect(() => {
    fetchPost(Number(id))
  }, [])

  // Functions
  const fetchPost = async (id: number) => {
    try {
      setLoading(true);
      setFetchError(false);
      const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/post?id=${id}`);
      const post = await res.json();
      setPost(post);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setFetchError(true);
    }
  }

  if (loading) {
    return (
      <div className="h-[calc(100svh-80px)] w-full">
        <Loading />
      </div>
    )
  }

  if (fetchError || !post) {

    return (
      <div className="flex flex-col items-center justify-center w-full h-[calc(100svh-80px)]  gap-5 grow">
        <h2>An Error Has Ocurred</h2>
        <p>Please try again.</p>
      </div>
    );
  }

  return (
    <div className='w-full h-[calc(100dvh-80px)] grid md:grid-cols-2 justify-between items-center gap-4 '>
      {/* Left */}
      <div className='flex flex-col items-center justify-center w-full h-fit md:h-full aspect-square'>
        {/* Image */}

        <img src={post.image} alt='article' className='object-cover w-full h-full' />

      </div>


      {/* Right */}
      <div className='flex flex-col items-center justify-start w-full h-full px-2 gap-y-10 md:justify-center'>
        {/* title */}
        <div className='w-full my-4'>
          <h2 className='font-mono text-xl font-extrabold underline uppercase text-start sm:text-2xl md:text-3xl'>{post.title}</h2>
        </div>

        {/* Content */}
        <div className='p-2 my-4 bg-gray-500 rounded-xl h-fit '>
          <div className='p-2 overflow-scroll bg-gray-100 rounded-lg h-fit'>
            <p className='text-xl uppercase '>{post.content}</p>
          </div>
        </div>

        {/* User */}
        <div className='flex flex-col items-start justify-center w-full'>
          <p className='text-sm italic text-gray-600/70'>Created By: {post.user_id}</p>
        </div>
      </div>

    </div>
  )
}

export default PostDetail
import React, { useEffect, useState } from 'react'

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
      // setLoading(true);
      // setFetchError(false);
      const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/post?id=${id}`);
      const post = await res.json();
      console.log(`${process.env.REACT_APP_PUBLIC_URL}/api/post?id=${id}`);
      // console.log(post);
      // setPost(post.post);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log(error);
      // setFetchError(true);
    }
  }

  return (
    <div>PostDetail for {id}</div>
  )
}

export default PostDetail
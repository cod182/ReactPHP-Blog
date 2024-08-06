import React from 'react'
import { useParams } from "react-router-dom";
const PostDetail = () => {
  const { id } = useParams();

  return (
    <div>PostDetail for {id}</div>
  )
}

export default PostDetail
import Post from "./Post"
import { PostProp } from "../../../types/types"

type Props = {
  posts: PostProp[]
}

const Posts = ({ posts }: Props) => {


  return (
    <div className='grid items-center justify-center w-full h-full gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-3 min-h-[50vh]'>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
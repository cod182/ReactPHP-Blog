import { Link } from 'react-router-dom';
import { PostProp } from '../../types/types'
type Props = {
  post: PostProp;
}

const Post = ({ post }: Props) => {
  return (
    <Link to={`/post/${post.id}`} className='flex flex-col items-start justify-between w-full h-full px-2 bg-blue-400/50 rounded-xl'>
      {/* Title */}
      <div className='flex flex-row items-center justify-start py-2 w-fit'>
        <h3 className='text-lg font-semibold'>{post.title}</h3>
      </div>

      {/* Image */}

      <div className='w-full h-[50px] overflow-hidden rounded-md'>
        <img src={post.image} alt={``} className='object-cover w-full h-full' />
      </div>

      {/* Content */}
      <div className='p-2 my-2 overflow-scroll bg-gray-300 rounded-md shadow-xl h-fit'>
        <p className='h-full p-2 overflow-scroll bg-white rounded-md'>{post.content}</p>
      </div>
      {/* Creator */}
      <div className='w-full h-fit'>
        <p className='text-sm italic text-gray-600'>Creator ID: {post.user_id}</p>
      </div>
    </Link>
  )
}

export default Post
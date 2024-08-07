import { Link } from 'react-router-dom';
import { PostProp } from '../../types/types'
type Props = {
  post: PostProp;
}

const Post = ({ post }: Props) => {
  return (
    <Link to={`/post/${post.id}`} className='relative flex flex-col items-start justify-between w-full h-full min-h-[300px] p-4 overflow-hidden transition-all duration-200 group rounded-xl ease hover:scale-105 shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)] hover:'>
      {/* Overlay */}
      <div className='z-[2] group-hover:h-full h-[0%] w-full bg-gray-600/60  absolute top-0 left-0 transition-all duration-400 ease flex flex-col justify-center items-center overflow-hidden backdrop-blur-sm	'>
        <p className='text-2xl font-bold text-white'>View Post</p>
      </div>

      {/* Title */}
      <div className='flex flex-row items-center justify-start px-2 py-2 w-fit'>
        <h3 className='text-xl font-semibold min-h-[60px] capitalize'>{post.title}</h3>

      </div>

      {/* Image */}

      <div className='w-full overflow-hidden rounded-md h-[200px]'>
        <img src={post.image} alt={``} className='object-cover w-full h-full' />
      </div>

      {/* Content */}
      <div className='p-2 my-2 overflow-scroll rounded-md h-fit bg-gray-300/80'>
        <p className='h-full p-2 overflow-scroll rounded-md bg-white/90'>{post.content.substring(0, 100)}{post.content.length > 100 && '...'}</p>
      </div>

    </Link>
  )
}

export default Post
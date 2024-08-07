import { Link } from 'react-router-dom';
import { PostProp } from '../../types/types'

type Props = {
  posts: PostProp[];
  handleClick: (val: boolean) => void;
}

const SearchResults = ({ posts, handleClick }: Props) => {
  return (
    <div className={`w-full h-auto bg-gray-300/80 rounded-lg z-[10] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-4 my-4 overflow-scroll p-4`}>
      {posts.map((post) => (
        <a href={`/post/${post.id}`} onClick={() => handleClick(false)} key={post.id} className='p-4 mx-auto transition-all duration-200 rounded-lg w-[80%] bg-gray-400/80 hover:scale-105 ease hover:bg-gray-400'>

          <p >{post.title}</p>
        </a>
      ))}
    </div>
  )
}

export default SearchResults
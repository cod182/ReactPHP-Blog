import { Loading, Posts } from "../components";
import { useEffect, useState } from "react"

import { PostProp } from '../../types/types';
import ReactPaginate from 'react-paginate';

const Home = () => {

  // UseStates
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [posts, setPosts] = useState<PostProp[]>()

  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const [fetchError, setFetchError] = useState(false)
  const [loading, setLoading] = useState(true);



  // UseEffects
  useEffect(() => {
    fetchPosts(pageSize, offset)
  }, [offset, pageSize])

  // Functions
  const fetchPosts = async (pageSize: number, offset: number) => {
    try {
      setLoading(true);
      setFetchError(false);
      const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/posts?limit=${pageSize}&offset=${offset}`)
      const posts = await res.json();
      setTotalPosts(posts.count);
      setPosts(posts.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setFetchError(true);
    }
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected);

    setOffset(newOffset);
  };


  // RETURNS

  if (loading) {
    return (
      <div className="h-[calc(100svh-80px)] w-full">
        <Loading />
      </div>
    )
  }

  if (fetchError || totalPosts <= 0 || !posts) {

    return (
      <div className="flex flex-col items-center justify-center w-full h-[calc(100svh-80px)]  gap-5 grow">
        <h2>An Error Has Ocurred</h2>
        <p>Please try again.</p>
      </div>
    );
  }

  if (totalPosts >= 1 && posts) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="w-full px-2 py-4 text-4xl font-bold underline">Latest Posts</h1>
        <Posts posts={posts} />

        <div className="">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={Math.ceil(totalPosts / pageSize)}
            previousLabel="<"
            renderOnZeroPageCount={null}
            breakClassName={``}
            breakLinkClassName={``}
            initialPage={offset}
            containerClassName={`py-4 flex flex-row items-center justify-center 2-full `}
            pageClassName={`active:bg-gray-300 hover:scale-105 hover:border-[1px] aspect-square min-h-[30px] min-w-[30px] flex flex-col justify-center items-center rounded-full border-blue-200 transition-all duration-200 ease`}
            pageLinkClassName={`hover:scale-105 transition-all duration-200 ease`}
            activeClassName={`border-[1px] border-blue-200 bg-gray-300 rounded-full hover:scale-100 select-none cursor-default transition-all duration-200 ease`}
            previousClassName={`${offset <= 0 ? 'hidden' : 'visible'}`}
            nextClassName={`${offset >= ((Math.ceil(totalPosts / pageSize) - 1)) ? 'hidden' : 'visible'}`}
          />
        </div>
      </div>
    )
  }

  return (<></>)

}

export default Home
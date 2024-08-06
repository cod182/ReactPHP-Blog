import { useEffect, useState } from "react"

import ReactPaginate from 'react-paginate';

type PostProp = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string;
}

const Home = () => {

  // UseStates
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [posts, setPosts] = useState<PostProp[]>()

  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  console.log(posts);


  // UseEffects
  useEffect(() => {
    fetchPosts(pageSize, offset).then((posts) => {
      setTotalPosts(posts.count);
      setPosts(posts.posts);
    })
  }, [offset, pageSize])

  // Functions
  const fetchPosts = async (pageSize: number, offset: number) => {
    const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/posts?limit=${pageSize}&offset=${offset}`)
    return await res.json();
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  };

  if (totalPosts >= 1 && posts) {
    console.log(Math.ceil(totalPosts / pageSize))

    return (
      <div className="">
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
  } else {
    return (
      <div className="w-full h-full">Error Occured</div>
    )
  }
}

export default Home
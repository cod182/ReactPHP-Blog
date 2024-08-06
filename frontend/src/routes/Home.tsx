import { useEffect, useState } from "react"
type PostProp = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string;
}

const Home = () => {

  // UseStates
  const [totalPosts, setTotalPosts] = useState<number>()
  const [posts, setPosts] = useState<PostProp[]>()


  // UseEffects
  useEffect(() => {

    let pageSize = 10
    let offset = 0

    fetchPosts(pageSize, offset).then((posts) => { console.log(posts) })
  }, [])

  // Functions
  const fetchPosts = async (pageSize: number, offset: number) => {
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/${process.env.REACT_APP_DBNAME}/api/posts?limit=${pageSize}&offset=${offset}`
    )
    console.log(res)
    return await res.json();
  }

  return (
    <div>Home</div>
  )
}

export default Home
import { useEffect, useState } from "react"
type PostProp = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string;
}

const Home = () => {

  // Declarations

  const publicUrl = process.env.REACT_APP_PUBLIC_URL;
  const databaseName = process.env.REACT_APP_DBNAME;

  console.log(publicUrl);

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
      `${publicUrl}/${databaseName}/api/posts`
    )
    console.log(res)
    return await res.json();
  }

  return (
    <div>Home</div>
  )
}

export default Home
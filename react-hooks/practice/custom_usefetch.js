import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Implement the `useFetch` function. 
*/

function useFetch (url) {

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [post, setPost] = React.useState(null)
  

  React.useEffect( () => {
    setLoading(true)

      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setError(null)
        setPost(data)
      })
      .catch((error) => {
        setLoading(false)
        setError("Error retrieving data.")
      })

  }, [url] )
  

  return {
    loading, 
    error, 
    post
  }
}

const postIds = [1,2,3,4,5,6,7,8]

function App() {
  const [index, setIndex] = React.useState(0)

  const { loading, post, error }= useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  )

  const incrementIndex = () => {
    setIndex((i) => 
      i === postIds.length - 1
        ? i
        : i + 1
    )
  }

  if (loading === true) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    )
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {index === postIds.length - 1 
        ? <p>No more posts</p>
        : <button onClick={incrementIndex}>
            Next Post
          </button>}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

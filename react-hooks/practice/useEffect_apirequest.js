// this might be broken at the moment, seems like jsonplaceholder is really slow/returning errors


import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1,2,3,4,5,6,7,8]

function fetchPost (id) {
  console.log('fetching post id',id)
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => {
      console.log('res', res.json())
      return res.json()
    })
}

function App() {
  const [currentPostIndex, setCurrentPostIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [post, setPost] = React.useState(null)
  
  React.useEffect( () => {
    setLoading(true)

    
    fetchPost(postIds[currentPostIndex])
    .then((post) => { 
      setPost(post)
      setLoading(false)
      setError(null)
    })
    .catch((err) => {
      console.warn(err)
      setError('Error fetching data')
      setLoading(false)
    })
  },[currentPostIndex])

  const handleClick = () => {
    if(currentPostIndex === postIds.length-1) {
      setCurrentPostIndex(0)
    } else {
      setCurrentPostIndex((currentPostIndex) => currentPostIndex+1)
    }
  }

  if(loading) return <h1>Loading</h1>

  if(error) {
    return (
        <React.Fragment>
          <button onClick={handleClick}>Next Post</button>
          <h1>{error}</h1>
        </React.Fragment>
      )
    }

  return (
    <div className="App">
      <button onClick={handleClick}>Next Post</button>
      <div>
          <h1>{post.title}</h1>
          {/* <p dangerouslySetInnerHTML={{__html: post.body}} /> */}
          <p>post.body</p>
        </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

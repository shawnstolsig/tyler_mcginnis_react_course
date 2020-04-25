import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Refactor `useFetch` to use `useReducer` instead of
    `useState`.
*/

function fetchReducer({loading, data, error}, {type, res}){
  if(type==='fetch'){
    return {
      loading: true,
      data: null,
      error: null
    }
  } else if (type==="error"){
    return {
      error: 'Error fetching data. Try again.',
      loading: false,
      data: null
    }
  } else if (type==='success'){
    return{
      error: null,
      loading: false,
      data: res
    }
  } else {
    throw new Error("Unknown action type")
  }
}


function useFetch (url) {
  const [ state, dispatch ] = React.useReducer(fetchReducer, {
    loading: true,
    data: null,
    error: null
  })


  React.useEffect(() => {
    dispatch({type: 'fetch'})

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({type: 'success', res: data})
      })
      .catch((e) => {
        dispatch({type: 'error'})
      })
  }, [url])

  const { loading, data, error } = state
  return { loading, data, error }

}

const postIds = [1,2,3,4,5,6,7,8]

function App() {
  const [index, setIndex] = React.useState(0)

  const { loading, data: post, error } = useFetch(
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
      {error && <p>{error}</p>}
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

import React from 'react'
import queryString from 'query-string'
import { fetchItem, fetchPosts, fetchComments } from '../utils/api'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'

function postReducer(state, action) {
  if (action.type === 'fetchPost') {
    return {
      loadingPost: true,
      loadingComments: false,
      error: null,
      post: null,
      comments: []
    }
  } else if (action.type === 'fetchComments'){
    return {
      loadingPost: false,
      loadingComments: true,
      error: null,
      post: action.post,
      comments: []
    }
  } else if (action.type === 'success') {
    return {
      error: null,
      comments: action.comments,
      loadingComments: false,
      loadingPost: false,
      post: state.post
    }
  } else if (action.type === 'error') {
    return {
      loadingPost: false,
      loadingComments: false,
      error: action.message,
      post: state.post,
      comments: state.comments
    }
  } else {
    throw new Error ("unsupported action")
  }
}

export default function Post({location}) {

  const [state, dispatch] = React.useReducer(postReducer, {
    post: null,
    loadingPost: true,
    comments: [],
    loadingComments: true,
    error: null,
  })

  React.useEffect( () => {
    const { id } = queryString.parse(location.search)

    dispatch({type: 'fetchPost'})

    fetchItem(id)
      .then((post) => {
        dispatch({type: 'fetchComments', post})

        return fetchComments(post.kids || [])
      })
      .then((comments) => {
        dispatch({type: 'success', comments})
      })
      .catch(({ message }) => {
        dispatch({type: 'error', message})
      })

  }, [location])



  const { post, loadingPost, comments, loadingComments, error } = state

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return (
    <React.Fragment>

      {loadingPost === true
        ? <Loading text='Fetching post' />
        : <React.Fragment>
          <h1 className='header'>
            <Title url={post.url} title={post.title} id={post.id} />
          </h1>
          <PostMetaInfo
            by={post.by}
            time={post.time}
            id={post.id}
            descendants={post.descendants}
          />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </React.Fragment>}

      {loadingComments === true
        ? loadingPost === false && <Loading text='Fetching comments' />
        : <React.Fragment>
          {comments.map((comment) =>
            <Comment
              key={comment.id}
              comment={comment}
            />
          )}
        </React.Fragment>}

    </React.Fragment>
  )
}

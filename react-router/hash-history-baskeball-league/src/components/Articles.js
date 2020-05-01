import React from 'react'
import { Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loading from './Loading'
import { getTeamsArticles } from '../api'
import Article from './Article'

function articleReducer(state, action){
    if(action.type==='loading'){
        return {
            articles: [],
            loading: true
        }
    } else if (action.type==="success"){
        return {
            loading: false,
            articles: action.articles
        }
    } else {
        throw new Error("action not supported")
    }
}

export default function Articles (props){
    const {match} = props
    const [state, dispatch] = React.useReducer(articleReducer,{
        articles: [],
        loading: false,
    })
    
    React.useEffect(()=>{
        dispatch({type:'loading'})
        getTeamsArticles(match.params.teamName)
        .then((articles) => {
            dispatch({type:'success', articles: articles.map((art) => art.title)})
        })
        
    },[match])
    
    const {loading, articles} = state
    const {teamName} = match.params

    if(loading) {
        return <Loading />
    }

    return (
        <div className="container two-column">
            <Sidebar loading={loading} title="Articles" list={articles} {...props} />
            
            <Route path={`${match.url}/:articleId`} render={({match}) => (
                <Article articleId={match.params.articleId} teamId={teamName}>
                    {(article) => !article ? <Loading /> 
                    : 
                    <div className="panel">
                        <article className="article" key={article.id}>
                            <h1 className="header">{article.title}</h1>
                            <p>{article.body}</p>
                        </article>
                    </div>}
                </Article>
            )}
            />
        </div>
    )

}

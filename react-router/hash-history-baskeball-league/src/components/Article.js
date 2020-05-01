import React from 'react'
import { getArticle } from '../api'
import PropTypes from 'prop-types'

export default function Article(props){
    const {articleId, teamId, children} = props
    const [article, setArticle] = React.useState(null)

    React.useEffect(() => {
        getArticle(teamId, articleId)
        .then((art) => setArticle(art))
    }, [articleId, teamId])

    return children(article)
}
Article.propTypes = {
    articleId: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
}
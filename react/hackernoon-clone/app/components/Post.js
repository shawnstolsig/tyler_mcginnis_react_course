import React from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'
import * as moment from 'moment'

import { ThemeConsumer } from '../contexts/Theme'
import { getItem } from '../util/api'

// when Post element is created, it'll take in the id of the story as a prop, then pull from the API when mounted
export default class Post extends React.Component {
    // store the UI elements that will be rendered by this component
    state = {
        title: null,
        url: null,
        user: null,
        time: null,
        comments: null
    }
    componentDidMount(){
        // get item's id from props
        const { itemId } = this.props

        // get item's data from api
        getItem(itemId)
        .then((itemData) => {

            // store item's data in state
            this.setState({
                title: itemData.title,
                url: itemData.url,
                user: itemData.by,
                time: moment.unix(itemData.time).format("M/D/YYYY, h:mm a"),
                comments: itemData.descendants
            })
        })
    }
    render (){
        const { itemId } = this.props
        const { title, url, user, time, comments } = this.state

        if(title == null){
            return ''
        }

        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <div className="post-container">
                        <h4><a href={url}>{title}</a></h4>
                        <p>by 
                            <Link 
                                to={{
                                    pathname: '/user',
                                    search: `?user=${user}`
                                }}
                                className="user-link"
                                >{user}
                            </Link>
                            at {time} with 
                            <Link
                                to={{
                                    pathname: '/post',
                                    search: `?id=${itemId}`
                                }}
                                className="user-link"
                            >{comments}
                            </Link> comment{comments == 1 ? '' : 's'}</p>
                    </div>
                )}
            </ThemeConsumer>
        )
    } 
}
Post.propTypes = {
    itemId: PropTypes.number.isRequired
}
import React from 'react'
import QueryString from 'query-string'
import { getItem } from '../util/api'
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import Comment from './Comment'

export default class Detail extends React.Component {
    state = {
        title: null,
        url: null,
        user: null,
        time: null,
        comments: null
    }
    componentDidMount(){

        // get query parameter
        const { id } = QueryString.parse(this.props.location.search)

        // get item's data from api
        getItem(id)
        .then((itemData) => {

            console.log('itemData in detail', itemData)

            // store item's data in state
            this.setState({
                title: itemData.title,
                url: itemData.url,
                user: itemData.by,
                time: moment.unix(itemData.time).format("M/D/YYYY, h:mm a"),
                comments: itemData.descendants,
                kids: itemData.kids
            })
        })
    }
    render () {
        const { id } = QueryString.parse(this.props.location.search)
        const { title, url, user, time, comments, kids } = this.state

        return (
            <div>
                <h1><a href={url}>{title}</a></h1>
                <p>by <Link 
                        to={{
                            pathname: '/user',
                            search: `?user=${user}`
                        }}
                        className="user-link"
                        >{user}
                    </Link> at {time} with <Link
                        to={{
                            pathname: '/post',
                            search: `?id=${id}`
                        }}
                        className="user-link"
                    >{comments}
                    </Link> comment{comments == 1 ? '' : 's'}</p>
                    { kids && (
                        <ol>
                            {kids.map( (id) => (
                                <li key={id}>
                                    <Comment itemId={id}/>
                                </li>
                            ))}
                        </ol>
                    )}
            </div>
        )
    }
}
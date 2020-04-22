import React from 'react'
import QueryString from 'query-string'

import Post from './Post'
import Loading from './Loading'
import { getUser } from '../util/api'
import * as moment from 'moment'

export default class User extends React.Component {
    state = {
        user: null,
        created: null,
        karma: null,
        about: null,
        submitted: []
    }
    componentDidMount(){

        // get user from query string
        const { user } = QueryString.parse(this.props.location.search)

        // set user so it can be displayed before HN API call
        this.setState({
            user
        })

        // pull user info from api
        getUser(user).then((data) => {

             // update state
            this.setState({
                created: moment.unix(data.created).format("M/D/YYYY, h:mm a"),
                karma: data.karma,
                about: data.about,
                submitted: data.submitted
            })

        })

    }
    render(){
        const { user, created, karma, about, submitted } = this.state

        if(about===null){
            return <Loading />
        }

        return (
            <div>
                <h1>{user}</h1>
                { created === null ? <Loading text="Getting user info..."/> : (
                    <React.Fragment>
                        <h5>joined {created} has {karma} karma</h5>
                        <p dangerouslySetInnerHTML={{__html: about}} />
                        <h3>Posts</h3>
                        <ol>
                            {submitted.map( (id) => (
                                <li key={id}>
                                    <Post itemId={id}/>
                                </li>
                            ))}
                        </ol>
                    </React.Fragment>
                ) }
            </div>
        )
    }
}
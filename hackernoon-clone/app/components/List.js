import React from 'react'
import PropTypes from 'prop-types'

import Post from './Post'
import Loading from './Loading'
import { ThemeConsumer } from '../contexts/Theme'

export default class List extends React.Component{
    state = {
        stories: []
    }
    componentDidMount(){
        const { getIds } = this.props

        // get 50 story ids, set them in state
        getIds().then((stories) => {
            this.setState({
                stories
            })
        })
    }
    componentDidUpdate(){
        const { getIds } = this.props

        // get 50 new story ids, set them in state
        getIds().then((stories) => {
            this.setState({
                stories
            })
        })
        .catch((err) => {
            alert(err.message)
        })
    }
    render () {
        const { stories } = this.state

        if(stories == []){
            return <Loading text="Getting stories..." />
        }

        return (
            <ol>
               {stories.map( (id) => (
                    <li key={id}>
                        <Post itemId={id}/>
                    </li>
                ))}
            </ol>
        )
    }
}
List.propTypes = {
    getIds: PropTypes.func.isRequired
}
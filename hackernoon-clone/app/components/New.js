import React from 'react'

import Post from './Post'
import { new50Ids } from '../util/api'
import { ThemeConsumer } from '../contexts/Theme'

export default class New extends React.Component{
    state = {
        stories: []
    }
    componentDidMount(){
        // get 50 new story ids, set them in state
        new50Ids().then((stories) => {
            this.setState({
                stories
            })
        })
    }
    render () {
        const { stories } = this.state

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
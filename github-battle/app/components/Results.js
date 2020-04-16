import React from 'react'
import { battle } from '../utils/api'

export default class Results extends React.Component{
    render(){


        return  (
            <div>
                RESULTS
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        )
    }
    componentDidMount(){
        const {playerOne, playerTwo} = this.props

        battle([playerOne, playerTwo])
            .then( (players) => {
                console.log('data from battle: ', players)
            })
    }
}   
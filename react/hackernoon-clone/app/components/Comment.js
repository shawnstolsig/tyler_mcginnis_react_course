import React from 'react'
import * as moment from 'moment'
import { getItem } from '../util/api'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/Theme'

export default class Comment extends React.Component {
    state = {
        itemId: null,
        user: null,
        time: null,
        kids: null,
        text: null,
    }
    componentDidMount(){
        const { itemId } = this.props

        // get item's data from api
        getItem(itemId)
        .then((itemData) => {

            // store item's data in state
            this.setState({
                itemId: itemId,
                user: itemData.by,
                time: moment.unix(itemData.time).format("M/D/YYYY, h:mm a"),
                kids: itemData.kids,
                text: itemData.text,
            })
        })

    }
    render() {
        const { user, time, kids, text } = this.state

        return (
            <ThemeConsumer>
                {({theme}) => (
                    <div className={`comment-container-${theme}`}>
                        <p>by <Link 
                                to={{
                                    pathname: '/user',
                                    search: `?user=${user}`
                                }}
                                className="user-link"
                                >{user}
                            </Link> at {time}: 
                        </p>
                        <div dangerouslySetInnerHTML={{__html: text}} />
                    </div>
                )}
                
            </ThemeConsumer>
        )
    }
}
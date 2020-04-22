// get details of one item.  note this item can be a story or a comment.
export function getItem(id){

    // get the item from Hacker Noon's api
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
             // convert json to object
            .then((res) => res.json())
}

// get 50 top story ids
export function top50Ids(){

    return fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
        // first endpoint returns an array of story ids
        .then((res) => res.json())
        .then((data) => {

            // if more than 50 stories returned, only return top 50 
            if (data.length > 50){
                return data.slice(0,50)
            }
            
            return data
        })
}

// get 50 new story ids
export function new50Ids(){

    return fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
        // first endpoint returns an array of story ids
        .then((res) => res.json())
        .then((data) => {

            // if more than 50 stories returned, only return top 50 
            if (data.length > 50){
                return data.slice(0,50)
            }
            return data
        })

}


// get user 
export function getUser(id){

    return fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`)
        .then((res) => res.json())
}

// Switch uncommented lines if starting to get rate limited.  Make sure api key not pushed to Github.

// const id = "YOUR_CLIENT_ID"
// const sec = "YOUR_SECRET_ID"
// const params = `client_id=${id}&client_secret=${sec}`
const params = ''

// helper function to help handle profile api errors
function getErrorMsg(message, username){

    // print user-friendly error if profile isn't found
    if(message === "Not Found"){
        return `${username} doesn't exist.`
    }

    // print error otherwise, which will likely be if rate limited
    return message
}


// get data on given username profile from Github api
function getProfile(username){

    // user profile endpoint
    const endpoint = `https://api.github.com/users/${username}?${params}`

    return fetch(endpoint)
            .then((res) => res.json())
            .then((profile) => {

                // if github returns an error, it will exist in .message property
                if (profile.message){
                    throw new Error(getErrorMsg(profile.message, username))
                }  

                // no error, just return data
                return profile
            })

}

// a function for tallying up all the stars of their repo
function getStarCount(repos){
    // count is what previous function returned, 0 is the starting value
    return repos.reduce( (count, {stargazers_count}) => count + stargazers_count, 0)
}

// a function for calculating each player's score
function calculateScore(followers, repos){
    return (followers * 3) + getStarCount(repos)
}


// a function to get all user data
function getUserData(player){
    
    // Promise.all will take in an array of promises and return an array of each promises' output
    return Promise.all([
            getProfile(player),
            getRepos(player)
            ]).then(([profile, repos]) => ({         // using array destructuring and implicit return for an object
                profile,
                score: calculateScore(profile.followers, repos)
            }))
}

// get data on given username repos from Github api
function getRepos(username){

    // user profile endpoint
    const endpoint = `https://api.github.com/users/${username}/repos?per_page=100&${params}`

    return fetch(endpoint)
            .then((res) => res.json())
            .then((repos) => {

                // if github returns an error, it will exist in .message property
                if (repos.message){
                    throw new Error(getErrorMsg(repos.message, username))
                }  

                // no error, just return data
                return repos
            })
}

// function for deciding who one (will sort an array)
function sortPlayers(players) {
    return players.sort( (a,b)=> b.score - a.score)
}

// a function to actually tie the whole battle together, exported so that the Battle component can access it
export function battle(players){
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ])
    // sort results so that the first player is the winner
    .then((results) => sortPlayers(results))
}


// get data on popular repos from Github API
export function fetchPopularRepos(language){

    // endpoint for getting info from Github
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
    .then( (res) => res.json())
    .then( (data) => {

        // if error with request
        if(!data.items){
            throw new Error(data.message);
        }

        // return data
        return data.items
    })

    // will put .catch on fetchPopularRepos invocation so that we can handle bad responses within UI layer
}



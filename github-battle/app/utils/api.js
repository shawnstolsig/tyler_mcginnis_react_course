export function fetchPopularRepos(language){

    // endpoint for getting info from Github
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
    .then( (res)=> res.json())
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
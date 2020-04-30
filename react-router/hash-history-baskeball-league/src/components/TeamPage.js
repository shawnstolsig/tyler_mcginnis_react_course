import React from 'react'

export default function TeamPage({ match }){
    return (
        <h1>{match.params.teamName}'s Page</h1>
    )
}
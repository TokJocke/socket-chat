import fetch from "node-fetch";

export async function makeReq(url) {
    try {
        const response = await fetch(url); 
        const jsonData = await response.json()
        return jsonData
    }

    catch(err) {
        console.log(err)
    }
    
}

export async function makeJoke(param) {
    const strCopy = param.split('.');
    if(!strCopy[1]) {
        const joke = await makeReq(`https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,racist,sexist&type=single`) 
        console.log(joke)
        return joke.joke  
    }
    else {
        const joke = await makeReq(`https://v2.jokeapi.dev/joke/${strCopy[1]}?type=single`) // https://v2.jokeapi.dev/joke/Dark?type=single
        console.log(joke)
        return joke.joke  
    }
}

export async function getBored() {
    const boredaf = await makeReq('http://www.boredapi.com/api/activity/')
    console.log(boredaf)
    return boredaf.activity
}

     




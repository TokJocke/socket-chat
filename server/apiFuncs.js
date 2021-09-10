import { json } from "express";
import fetch from "node-fetch";
import { parse } from "uuid";


export async function makeReq(url) {
    const response = await fetch(url); 
    const jsonData = await response.json()
    return jsonData
    
}

/* export const endpoints = {
    func: async function joke(param) {
        const response = makeReq(`https://v2.jokeapi.dev/joke/Any?type=${param}`)  
        console.log(response, "api data here")
        
    }
}  */

export async function joke() {
    const joke = makeReq('https://v2.jokeapi.dev/joke/Any?type=single')  
    console.log(joke.joke)
    
    /* return JSON.stringify(joke.joke) */
}

     
/* export function joke2() {
    const response = makeReq('https://v2.jokeapi.dev/joke/Any?type=twopart')
    console.log(response, "api data here")
} */




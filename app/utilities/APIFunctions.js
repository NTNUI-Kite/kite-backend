import axios from 'axios';
import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export function getBoardMembers(){
  return fetchFromServer("/api/boardMembers");
}

export function getInstaFeed(){
  return fetchFromServer("/api/instaFeed");
}

export function authorizedGetRequest(url){
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .set('Authorization', 'Bearer ' + AuthStore.getJwt())
      .end((err, response) => {
        if (err) reject(err);
        resolve(JSON.parse(response.text));
      })
  });
}

export function getRequest(url){
  return new Promise((resolve,reject)=>{
    request
    .get(url)
    .end((err,response) => {
      if(err) reject(err);
      resolve(JSON.parse(response.text));
    })
  });
}

function fetchFromServer(query) {
    return axios.get(query, {
        credentials: "same-origin"
    }).then(response => {
        if (response.status >= 400) {
            throw new Error("GET-request: Bad response from server");
        }
        return response
    }).then(function (result) {
        if (result.error) {
            console.log("The GET-request threw an error:\n" + query);
            return Promise.reject(result.error);
        } else {
            return result;
        }
    });
}

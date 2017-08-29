import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

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

export function postRequest(url,body){
  return new Promise((resolve,reject) =>{
    request
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .end(function(err, res){
     if (err || !res.ok) {
       reject(err);
     }
     else {
       resolve("success");
     }
   })
  });
}

export function AuthorizedPostRequest(url,body){
  return new Promise((resolve,reject) =>{
    request
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + AuthStore.getJwt())
    .end(function(err, res){
     if (err || !res.ok) {
       reject(err);
     }
     else {
       resolve(JSON.parse(res.text));
     }
   })
  });
}

export function PostRequestWithAuth(url,body,token){
  return new Promise((resolve,reject) =>{
    request
    .post(url)
    .send(body)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + token)
    .end(function(err, res){
     if (err || !res.ok) {
       reject(err);
     }
     else {
       resolve(JSON.parse(res.text));
     }
   })
  });
}

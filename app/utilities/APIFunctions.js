import request from 'superagent/lib/client';
import AuthStore from '../stores/AuthStore';

export const AuthorizedGetRequest = (url) => {
  const newRequest = new Promise((resolve, reject) => {
    request
      .get(url)
      .set('Authorization', `Bearer ${AuthStore.getJwt()}`)
      .end((err, response) => {
        if (err) reject(err);
        resolve(JSON.parse(response.text));
      });
  });
  return newRequest;
};


export const GetRequest = (url) => {
  const newRequest = new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, response) => {
        if (err) reject(err);
        resolve(JSON.parse(response.text));
      });
  });
  return newRequest;
};

export const PostRequest = (url, body) => {
  const newRequest = new Promise((resolve, reject) => {
    request
      .post(url)
      .send(body)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err);
        } else {
          resolve('success');
        }
      });
  });
  return newRequest;
};

export const AuthorizedPostRequest = (url, body) => {
  const newRequest = new Promise((resolve, reject) => {
    request
      .post(url)
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${AuthStore.getJwt()}`)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
  return newRequest;
};

export const PostRequestWithAuth = (url, body, token) => {
  const newRequest = new Promise((resolve, reject) => {
    request
      .post(url)
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err);
        } else {
          resolve(JSON.parse(res.text));
        }
      });
  });
  return newRequest;
};

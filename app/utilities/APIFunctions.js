import request from 'superagent/lib/client';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

const getNewToken = () => {
  const newRequest = new Promise((resolve, reject) => {
    request
      .get('/api/newToken')
      .set('Authorization', `Bearer ${AuthStore.getRefreshJwt()}`)
      .end((err, response) => {
        if (err) reject(err);
        AuthStore.setJwt(JSON.parse(response.text).token);
        resolve();
      });
  });
  return newRequest;
};

export const AuthorizedGetRequest = (url) => {
  const newRequest = new Promise((resolve, reject) => {
    request
      .get(url)
      .set('Authorization', `Bearer ${AuthStore.getJwt()}`)
      .end((err, response) => {
        if (err) {
          // If token is expired retreieve new token using the refreshToken
          if (JSON.parse(response.text).message === 'Expired jwt') {
            getNewToken().then(() => {
              // retry original request
              AuthorizedGetRequest(url).then((newResponse) => {
                resolve(newResponse);
              });
            })
              // If an error occurs log user out
              .catch((newErr) => {
                AuthActions.logUserOut();
                reject(newErr);
              });
          } else {
            reject(err);
          }
        } else {
          resolve(JSON.parse(response.text));
        }
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
      .end((err, response) => {
        if (err || !response.ok) {
          if (JSON.parse(response.text).message === 'Expired jwt') {
            getNewToken().then(() => {
              AuthorizedPostRequest(url, body).then((newResponse) => {
                resolve(newResponse);
              });
            })
              .catch((newErr) => {
                AuthActions.logUserOut();
                reject(newErr);
              });
          } else {
            reject(err);
          }
        } else {
          resolve(JSON.parse(response.text));
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

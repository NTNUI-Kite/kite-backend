import { AuthorizedPostRequest } from '../utilities/APIFunctions';

const Actions = {
  submitPayment: body => new Promise((resolve, reject) => {
    AuthorizedPostRequest('/api/pay', body)
      .then((response) => {
        resolve(response);
      })
      .catch((message) => {
        reject(message);
      });
  }),
};

export default Actions;

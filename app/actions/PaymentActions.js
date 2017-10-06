import { AuthorizedPostRequest } from '../utilities/APIFunctions';

const Actions = {
  submitPayment: (body) => {
    AuthorizedPostRequest('/api/pay', body)
      .then(() => {
      // TODO: update event
      });
  },
};

export default Actions;

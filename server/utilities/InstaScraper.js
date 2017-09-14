import request from 'request';

const getInstaFeed = new Promise((resolve) => {
  const url = 'https://www.instagram.com/explore/tags/ntnuikite/';

  request(url, (error, response, html) => {
    if (!error) {
      let data = html.split('window._sharedData = ')[1];
      data = data.split(';</script>')[0];
      resolve(JSON.parse(data));
    }
  });
});


export default getInstaFeed;

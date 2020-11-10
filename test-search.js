const axios = require('axios')

const options = {
  method: 'GET',
  url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
  params: {
    pageNumber: '1',
    pageSize: '10',
    q: 'ZeroDays in Desktop Web Browsers',
    autoCorrect: 'false',
  },
  headers: {
    'x-rapidapi-key': '2199788415msh7fa372ca101e5e7p1b3ae2jsn0663f5607665',
    'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
  },
}

axios
  .request(options)
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.error(error)
  })

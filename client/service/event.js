import axios from 'axios';

const service = {

  getEvents: () => {

    var promise = new Promise(function(resolve, reject) {
      axios.get('/event')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(Error(error));
      });
    });

    return promise

  }

}


export default service;

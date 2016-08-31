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

  },

  getEvent: (eventId) => {

    var promise = new Promise(function(resolve, reject) {
      axios.get(`/event/${eventId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(Error(error));
      });
    });

    return promise

  },

  save: (event) => {

    var promise = new Promise(function(resolve, reject) {

      axios.post('/event', {
          event: event
      })
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

import axios from 'axios';
import interceptor from './interceptor';
//import event from './event';

const service = {

  loggedIn () {
    return !!localStorage.token;
  },

  login: (email, password, loginComponent) => {

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…
      axios.post('/user/login', {
          email: email,
          password: password
      })
      .then((response) => {

        service.token = response.data.token;

        localStorage.token = service.token;

        console.log(service.token)

        resolve(service.token);
      })
      .catch((error) => {
        reject(Error(error));
      });
    });

    return promise

  }

}


export default service;

import axios from 'axios';

class Server {
  constructor() {
    //this.host = '18.231.184.37';
    this.host = 'localhost';
  }

  assert = (submission, context) => {
    axios.post(`http://${this.host}:8081/api/assert/`, submission)
      .then(function (response) {
        context.assertHandler(response.data)
      });
  }

  repairCode = (submission, callback) => {
    axios.post(`http://${this.host}:8081/api/repair/python/`, submission)
      .then(function (response) {
        callback(response.data)
      });
  }
}

export default Server;
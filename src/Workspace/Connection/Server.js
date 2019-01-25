import axios from 'axios';

class Server {
  constructor() {
    this.host = '18.231.184.37';
  }

  assert = (submission, context) => {
    axios.post(`http://${this.host}:8081/api/assert/`, submission)
      .then(function (response) {
        context.assertHandler(response.data)
      });
  }

  repairCode = (submission, context) => {
    axios.post(`http://${this.host}:8081/api/clara/python/`, submission)
      .then(function (response) {
        context.repairHandler(response.data)
      });
  }
}

export default Server;
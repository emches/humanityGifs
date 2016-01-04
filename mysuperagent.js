var request = require('superagent')

function mongoAddUser (userName){
    request
      .post('/users')
      .send({ name: userName })
      .end(function(err, res){
        console.log("response", res)
       //this.setState({currentUser: userName});

      });

}

module.exports = {mongoAddUser: mongoAddUser}
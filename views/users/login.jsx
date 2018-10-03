var React = require("react");

class userlogin extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>

          <form method="GET" action="/users/new">
            <input type="submit" value="New User" />
          </form>


          <form method="POST" action="/checkuser">
            <div>
              Current User:<input name="name" type="text" />
            </div>
            <input type="submit" value="Log In" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = userlogin;
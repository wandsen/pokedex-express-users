var React = require("react");

class Home extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <h2>Go to log in page</h2>

          <form method="GET" action="/userlogin">
            <input type="submit" value="UserLogin"/>
          </form>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;

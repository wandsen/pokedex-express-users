var React = require("react");

class currentUser extends React.Component {
  render() {

    let playerObject = this.props.player;



    let pokemonlist = playerObject.map( (item, index)=>{
        return(<li key={item.userid}>{item.pokemonname}</li>
            )
    });

    return (
      <html>
        <head />
        <body>
        <h1>Welcome {playerObject[0].playername}</h1>

        <h2>Which pokemon would you like to catch?</h2>

        <form method="GET" action={"/currentuser/" + playerObject[0].userid + "/catchpokemon"}>
        <input type="submit" value="Go catch pokemon!"/>
        </form>

        <h2>You have caught the following</h2>
        <ul>
            {pokemonlist}
        </ul>

        </body>
      </html>
    );
  }
}

module.exports = currentUser;
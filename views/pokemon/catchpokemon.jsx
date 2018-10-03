var React = require("react");

class catchpokemon extends React.Component {
  render() {

    let pokemonArray = this.props.allpokemon.pokemon;


    let listOfOptions = pokemonArray.map((item, index)=>{

        return(<option keys={item.id} value={item.id}>{item.name}</option>
            )
    })


    return (
      <html>
        <head />
        <body>
          <h1>Choose a pokemon to catch</h1>
            <form method="POST" action={'/currentuser/'+this.props.allpokemon.id+'/storepokemon'}>
              <select id="pokemon-select">
              {listOfOptions}
              </select>
              <input type="submit" value="catch!"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = catchpokemon;
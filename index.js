/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const config = {
  user: 'dsen',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

if (config.user === 'ck') {
	throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

 const getRoot = (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon;';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/home', {pokemon: result.rows} );
    }
  });
}

const getNew = (request, response) => {
  response.render('pokemon/new');
}

const getPokemon = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/pokemon', {pokemon: result.rows[0]} );
    }
  });
}

const postPokemon = (request, response) => {
  let params = request.body;

  const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2);';
  const values = [params.name, params.height];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
};

const editPokemonForm = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/edit', {pokemon: result.rows[0]} );
    }
  });
}

const updatePokemon = (request, response) => {
  let id = request.params['id'];
  let pokemon = request.body;
  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
  console.log(queryString);
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
}

const deletePokemonForm = (request, response) => {
  response.send("COMPLETE ME");
}

const deletePokemon = (request, response) => {
  response.send("COMPLETE ME");
}
/**
 * ===================================
 * User
 * ===================================
 */


const userNew = (request, response) => {
  response.render('users/new');
}

const userCreate = (request, response) => {

  const queryString = 'INSERT INTO users (name) VALUES ($1)';

  const values = [request.body.name];

  console.log(queryString);

  pool.query(queryString, values, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);
      response.send('dang it.');
    } else {

      console.log('Query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
}

const checkUser = (request , response)=>{
    let currentusername = request.body.name

    const queryString = 'SELECT * FROM users';

    pool.query(queryString, (err, result) => {
        let redirectUrl = '/currentuser/'

        if (err) {

          console.error('Query error:', err.stack);
          response.send('dang it.');
        } else {

            result.rows.forEach((element)=>{
                if (currentusername === element.name){
                    console.log(element.id)
                    redirectUrl += element.id

                }
            })

          // console.log('Query result:', result.rows[0].id);
          // console.log(typeof result.rows[0])
          // redirect to home page

          response.redirect(redirectUrl);
        }
    });


}

const userLogin = (request , response)=>{
    let currentuserid = request.params.id;

    response.render('users/login');
}

const currentUser = (request , response)=>{
    let currentuser = request.params.id

    let queryString = 'SELECT users.id AS userid ,users.name AS playername, pokemon.name AS pokemonname, pokemon.img AS pokemonimage FROM pokemon_users INNER JOIN users ON (pokemon_users.user_id = users.id) INNER JOIN pokemon ON (pokemon_users.pokemon_id = pokemon.id) WHERE users.id =' + currentuser;

    // let queryString = 'SELECT * FROM pokemon_users INNER JOIN users ON (users.id = pokemon_users.user_id) INNER JOIN pokemon ON (pokemon_users.pokemon_id = pokemon.id) WHERE pokemon_users.id =' + currentuser;


    pool.query(queryString, (err, result) => {
        if (err) {
          console.error('Query error:', err.stack);
          response.send('dang it.');
        } else{

        let playerstats = result.rows


        response.render('users/currentuser', {player: playerstats});

        }


    })
};


const catchPokemon = (request, response) => {
    let currentplayer = request.params.id

  const queryString = 'SELECT * from pokemon';

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {

        let objectPokemonId = {
            playerid: request.params.id,
            pokemon: result.rows};


    response.render('pokemon/catchpokemon' , {allpokemon:objectPokemonId});

    }
  });


}

const storePokemon = (request, response) => {

  // const queryString = 'SELECT * from pokemon';

  //     pool.query(queryString, (err, result) => {
  //       if (err) {
  //         console.error('Query error:', err.stack);
  //       } else {




  //       }
  //     });
    response.send("store pokemon");

}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getRoot);

app.get('/pokemon/:id/edit', editPokemonForm);
app.get('/pokemon/new', getNew);
app.get('/pokemon/:id', getPokemon);
app.get('/pokemon/:id/delete', deletePokemonForm);

app.post('/pokemon', postPokemon);

app.put('/pokemon/:id', updatePokemon);

app.delete('/pokemon/:id', deletePokemon);

// TODO: New routes for creating users

app.get('/users/new', userNew);
app.post('/users', userCreate);

app.post('/checkuser', checkUser);
app.get('/userlogin', userLogin);
app.get('/currentuser/:id', currentUser);
app.get('/currentuser/:id/catchpokemon', catchPokemon);

app.post('/currentuser/:id/storepokemon', storePokemon);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);



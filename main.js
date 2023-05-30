// Variable general

let pokemons;

// variable init para llamar a los pokemons

const init = async () => {
    const globalDiv$$ = document.createElement('div');
    globalDiv$$.className = 'pokemons';
    document.body.appendChild(globalDiv$$);
    
  //Iniciar la solicitud de información.
  
    pokemons = await getPokemons();
    printPokemons(pokemons);
  
};

const botonesHeader = document.querySelectorAll(".btn-header");
const container$$ = document.createElement('div');
const form = document.getElementById("search");

//Bloque de peticiones.

async function getPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const resPokemons = await res.json();
    //console.log(resPokemon.results)
    return getDetailPokemons(resPokemons.results);
}


async function getDetailPokemons(pokemons) {
    const pokemonsPromises = pokemons.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );
    return Promise.all(pokemonsPromises);
}

// Bloque para pintar los pokemons

const printPokemons = (pokemons) => {
    container$$.innerHTML = "";
    container$$.id = "pokedex";
    container$$.className = 'pokemons';
          console.log(pokemons);
    for (const pokemon of pokemons) {
      const div$$ = document.createElement('div');
      div$$.className = 'flip-card';
      div$$.classList.add("card");

      // Cartas para hacer el flip

      const innerDiv$$ = document.createElement('div');
      innerDiv$$.className = 'flip-card-inner';
      const frontDiv$$ = document.createElement('div');
      frontDiv$$.className = 'flip-card-front';
      const backDiv$$ = document.createElement('div');
      backDiv$$.className = 'flip-card-back';
      backDiv$$.classList.add(pokemon.types[0].type.name);
      

      // inserto la imagen y el nombre del pokemon
  
      const img$$ = document.createElement('img');
      img$$.setAttribute('src', pokemon.sprites.front_shiny);
      img$$.setAttribute('alt', pokemon.name);
      img$$.classList.add("card-image");
  
      // Utilizo la misma propiedad pero le pongo el nombre del pokemon con un h2.
  
      const h2$$ = document.createElement('h2');
      h2$$.textContent = pokemon.name;
      h2$$.classList.add("card-title");

      // Creo las clases de los pokemons

      const span$$ = document.createElement('span');
      span$$.textContent = "#" + pokemon.id;
      span$$.classList.add("id");

      const p$$ = document.createElement("p");
   for (const pokemonType of pokemon.types) {
    
      const span2$$ = document.createElement('span');

      span2$$.textContent = pokemonType.type.name;

      p$$.appendChild(span2$$);

      span2$$.classList.add("card-subtitle", pokemonType.type.name); 
   }

    // Parte trasera de las tarjetas con estadisticas y habilidades

   const h1$$ = document.createElement("h4");
   h1$$.textContent = "stats";
   h1$$.classList.add("backtitles");
   const ul$$ = document.createElement("ul");
for (const pokemonStats of pokemon.stats) {

      const li$$ = document.createElement('li');

      li$$.textContent = pokemonStats.stat.name + ": " + pokemonStats.base_stat; 
    
      ul$$.appendChild(li$$);

      ul$$.classList.add("statslist");
   }
  
    const h4$$ = document.createElement("h4");
    h4$$.textContent = "skills";
    h4$$.classList.add("backtitles");
   const skillsDiv$$ = document.createElement ("ul");
    skillsDiv$$.classList.add("skills");
   
        for (let i = 0; i < 4; i++){

            let number = Math.floor(Math.random() * pokemon.moves.length);

            let skillname = pokemon.moves[number].move.name;

            const li$$ = document.createElement('li');
            
            li$$.textContent = skillname;

            skillsDiv$$.appendChild(li$$);

        }
 
        const skillp$$ = document.createElement("p");

        skillp$$.appendChild(skillsDiv$$);


      div$$.appendChild(innerDiv$$);
      innerDiv$$.appendChild(frontDiv$$);
      innerDiv$$.appendChild(backDiv$$);
      frontDiv$$.appendChild(span$$);
      frontDiv$$.appendChild(img$$);
      frontDiv$$.appendChild(h2$$);
      frontDiv$$.appendChild(p$$);
      backDiv$$.appendChild(h1$$)
      backDiv$$.appendChild(ul$$);
      backDiv$$.appendChild(h4$$)
      backDiv$$.appendChild(skillsDiv$$);
      container$$.appendChild(div$$);
    }

    document.body.appendChild(container$$);
};
  
// Filtro por tipo de pokemons

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
  const botonId = event.currentTarget.id;

  let filteredPokemons = pokemons.filter((pokemon) => {
   
  let found = false;

    for (const type of pokemon.types) {
      if (found == false){
        found = (type.type.name == botonId);
      } 
    }
    return found;
  })

  if (botonId == "ver-todos"){
    filteredPokemons = pokemons;
  }

  printPokemons(filteredPokemons);
}));


let searchPokemon = document.getElementById("searchButton");
let searchInput = document.getElementById("search");

searchPokemon.addEventListener("click", function() {
  let searchedPokemon = searchInput.value;
  search(searchedPokemon);
});

function search(searchedPokemon) {

  let filteredPokemons = pokemons.filter((pokemon) => {
    return pokemon.name.includes(searchedPokemon)
  });
  printPokemons(filteredPokemons);
}

init();
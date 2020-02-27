const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons` 
console.log(TRAINERS_URL, POKEMONS_URL)

document.addEventListener("DOMContentLoaded", function () {
    fetchTrainers();
}); 


function fetchTrainers(){  
    fetch(TRAINERS_URL).then(response => response.json()) 
    .then(function(response){ 
        let trainerKeys = Object.keys(response);
        trainerKeys.forEach( key => {
            debugger    
            // in the rails c you can access the db and the associations 
            // here you get a static return of data so i can pull out a trainer
            // but if i try to get the pokemon associated with that trainer i get 
            // undefined. This is less useful than acutally using plain rails
            const cardsDiv = document.getElementById("cards")
            let subDiv = document.createElement("div");
            subDiv.setAttribute("class", "card"); 
            let button = document.createElement("button");
            button.innerText = "catch them all";
            button.addEventListener("click", e => catchPokemon( subDiv) )
            let name = document.createElement("h3");
            name.innerHTML = response[key]["name"]; 
            subDiv.appendChild(name); 
            subDiv.appendChild(button);
            cardsDiv.appendChild(subDiv);
        });
        function catchPokemon(subDiv){

            fetch(POKEMONS_URL).then( response => response.json()) 
            .then(function(response){  
                
               let pokemonKeys =  Object.keys(response);
               pokemonKeys.forEach( key => { 
                  let species =  response[key]["species"] 
                  console.log(species)
               })
            })
        }
        
    })
    
}


// data = pokemon

const card = document.querySelector('#poke-container')
const sortByIcon = document.querySelector('.fa-solid.fa-angle-down')

const loadButton = document.getElementById('load-button')
const loading = document.getElementById('loading')
const searchInput = document.getElementById('poke-finder');
const submitBtn = document.getElementById('search-submit')

//settings
const randomBtn = document.getElementById('sort-random')
const sortLH = document.getElementById('sort-lh')
const sortHL = document.getElementById('sort-hl')

const setSprite = document.getElementById('sprite-set');

//default 
let pokeCounter = 0;

allPokeData = []
randomizedData = []

//default off
let searchOn = false;

// set pokedex from id 0 and so on at default
let firstRun = false;

// random the pokedex
let randomMode = false;

// sort bool // default L to H
let sortSwitch = true;

//============================================== FIRST RUN
fetchData()

const sortingOptionClick = document.getElementById('sort-p')
const sortingOption = document.getElementById('sort-options')



sortingOptionClick.addEventListener('click', () => {

    sortingOption.classList.toggle('active')

    if (sortByIcon.classList.contains('fa-angle-down')) {
        sortByIcon.className = 'fa-solid fa-angle-up'
    } else {
        sortByIcon.className = 'fa-solid fa-angle-down'
    }

})

sortLH.addEventListener('click', () => {

    setSprite.disabled = true;
    sortingOption.classList.toggle('active')
    sortByIcon.className = 'fa-solid fa-angle-down'

    pokeCounter = 0;
    searchOn = false;
    sortSwitch = true;
    randomMode = false;
    card.innerHTML = ''
    displayPokemons()


    setTimeout(() => {
        setSprite.disabled = false;

    }, 1000);
})

sortHL.addEventListener('click', () => {

    loader()

    setSprite.disabled = true;
    sortingOption.classList.toggle('active')
    sortByIcon.className = 'fa-solid fa-angle-down'

    pokeCounter = allPokeData.length;
    searchOn = false;
    sortSwitch = false;
    randomMode = false;
    card.innerHTML = ''
    displayPokemons()

    setTimeout(() => {

        setSprite.disabled = false;

    }, 1000);

    removeLoader()

})

randomBtn.addEventListener('click', () => {
    loader();

    randomizedData = [...allPokeData].sort(() => Math.random() - 0.5)

    sortByIcon.className = 'fa-solid fa-angle-down'
    setSprite.disabled = true;
    sortingOption.classList.toggle('active')

    pokeCounter = 0;

    searchOn = false;
    randomMode = true;
    card.innerHTML = ''
    displayPokemons()

    setTimeout(() => {
        setSprite.disabled = false;
    }, 1000);

    removeLoader()
})




loadButton.addEventListener('click', () => {
    loader()

    if (sortSwitch) {
        pokeCounter += 12
    } else {
        pokeCounter -= 12;
    }


    setTimeout(() => {
        displayPokemons()
    }, 1000);

    removeLoader()

})

function loader() {

    // display loading gif
    loading.style.display = 'flex'

    // remove load button while data loading
    loadButton.style.display = 'none'

}

function removeLoader() {
    setTimeout(() => {
        // remove loading gif after data was loaded
        loading.style.display = 'none'

        //display loading button
        loadButton.style.display = 'block'
    }, 1000);
}




async function fetchData() {

    try {

        loader()
        card.style.justifyContent = "center"


        // if search input is empty, it will set the pokedex at default and turns off the random mode
        if (searchOn) {
            card.innerHTML = "";
            searchOn = false;
            pokeCounter = 0;
            randomMode = false;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);

        //data
        const pokemonData = await response.json();




        await loadAllPokemonData(pokemonData.results);



        displayPokemons()



    }

    catch (error) {
        console.error(error)
    }




    // display footer
    const footer = document.getElementById('footer');

    footer.innerHTML = `
   <p>Footer</p>
   `
    footer.style.display = 'block'

    setTimeout(() => {
        // remove loading gif after data was loaded
        loading.style.display = 'none'

        //display back loading button
        loadButton.style.display = 'block'
    }, 1000);


}


async function loadAllPokemonData(pokemonList) {


    const loadTotal = pokemonList.length
    let totalLoaded = 0

    const loadCounterText = document.getElementById('loadCounter')

    const list = pokemonList.map(async (pokemon) => {
        try {
            const response = await fetch(pokemon.url)
            const pokemonData = await response.json()

            const response1 = await fetch(pokemonData.species.url)
            const speciesData = await response1.json()

            totalLoaded++;
            loadCounterText.innerText = `Loaded Pokemons: ${totalLoaded} / ${loadTotal}`

            return {
                pokemon: pokemonData,
                species: speciesData
            }

        } catch (error) {
            console.error(error)
            return null
        }
    })

    test = await Promise.all(list)
    allPokeData = test

}

//    searchInput.addEventListener('input', (e) => {

//             const input = e.target.value 
//             console.log(input)

//         })

function displayPokemons() {

    pokemonsToShow = []




    if (sprites) {
        if (randomMode) {
            pokemonsToShow = randomizedData.slice(0, counter + 12)
            sprites = false
        }
        else if (sortSwitch) {
            pokemonsToShow = allPokeData.slice(0, counter + 12)
            sprites = false
        } else {

            pokemonsToShow = allPokeData.slice(counter - 12, allPokeData.length).reverse()
            sprites = false
        }

    } else {

        // random
        if (randomMode) {

            pokemonsToShow = randomizedData.slice(pokeCounter, pokeCounter + 12)

        }
        // low to high
        else if (sortSwitch) {

            pokemonsToShow = allPokeData.slice(pokeCounter, pokeCounter + 12)

        }
        // High to Low
        else {

            if (pokeCounter < 0) {
                alert("tite")
            } else {
                const startIndex = Math.max(0, pokeCounter - 12)
                pokemonsToShow = allPokeData.slice(startIndex, pokeCounter).reverse()
            }

        }
    }






    pokemonsToShow.forEach(pokemons => {

        generatePokemon(pokemons.pokemon, pokemons.species)
    });

    console.log("pokecounter " + pokeCounter)
    console.log("counter " + counter)
    console.log("counter " + allPokeData.length)
}




async function fetchPokemonData(pokemon) {
    const dataUrl = pokemon.url



    try {
        const response = await fetch(dataUrl)
        const pokemonData = await response.json()

        const response1 = await fetch(pokemonData.species.url)
        const speciesData = await response1.json()


        console.log(speciesData);

        generatePokemon(pokemonData, speciesData);


    }
    catch (error) {
        console.log(error)
    }

}



async function generatePokemon(pokemon, species) {

    const pokeInfoBox = document.createElement('div')
    pokeInfoBox.classList.add('poke-info')


    pokeInfoBox.addEventListener('click', () => {
        generateTab(pokemon, species)
    })

    const pokeSprite = document.createElement('img')
    pokeSprite.src = pokemon.sprites.other[`${sprite}`].front_default;


    const pokeName = document.createElement('h2')
    pokeName.innerText = capitalizeFirstLetter(pokemon.name)


    const pokeId = document.createElement('p')
    pokeId.classList.add('poke-id')
    if (pokemon.id < 10) {
        pokeId.innerHTML = `#000${pokemon.id}`
    } else if (pokemon.id < 100) {
        pokeId.innerHTML = `#00${pokemon.id}`
    } else if (pokemon.id < 1000) {
        pokeId.innerHTML = `#0${pokemon.id}`
    } else if (pokemon.id < 10000) {
        pokeId.innerHTML = `#${pokemon.id}`
    }




    const pokeTypeFlex = document.createElement('ul')
    pokeTypeFlex.classList.add('type-flex')

    getTypes(pokemon, pokeTypeFlex)





    pokeInfoBox.append(pokeSprite, pokeId, pokeName, pokeTypeFlex)
    card.append(pokeInfoBox);




}




function getTypes(pokemon, typeList) {

    pokemon.types.forEach(tayp => {
        const pokeType = document.createElement('li')
        pokeType.innerText = capitalizeFirstLetter(tayp.type.name)
        const typeBg = {
            grass: "#9bcc50",
            poison: "#b97fc9",
            fire: "#fd7d24",
            flying: "linear-gradient(to bottom, #19d3f3 50%, #bdbdbd 50%)",
            water: "#4592c4",
            bug: "#729f3f",
            normal: "#a4acaf",
            ground: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
            electric: "#f7de3f",
            fairy: "#fdb9e9",
            fighting: "#d56723",
            psychic: "#f366b9",
            rock: "#a38c21",
            dark: "#707070",
            ice: "#51c4e7",
            ghost: "#7b62a3",
            steel: "#9eb7b8",
            dragon: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)"
        }

        const typeColors = {
            grass: "#212121",
            poison: "white",
            fire: "white",
            flying: "#212121",
            water: "white",
            bug: "white",
            normal: "#212121",
            ground: "#212121",
            electric: "#212121",
            fairy: "#212121",
            fighting: "white",
            psychic: "white",
            rock: "white",
            dark: "white",
            ice: "#212121",
            ghost: "white",
            steel: "#212121",
            dragon: "white"
        }

        if (typeColors[tayp.type.name]) {
            pokeType.style.background = typeBg[tayp.type.name]
            pokeType.style.color = typeColors[tayp.type.name]

        }



        typeList.append(pokeType)
    });

}




// will caps first letter
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}


// enter button will hit search
searchInput.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        submitBtn.click()
    }
})





let sprite = "official-artwork"

let counter = 0

let sprites = false

setSprite.addEventListener('click', () => {



    sprites = true
    setSprite.disabled = true;



    card.innerHTML = ""

    if (sprite == "showdown") {

        sprite = "official-artwork"



        if (sortSwitch || randomMode) {

            if (counter != pokeCounter) {
                counter += 12
            }

        } else {

            if (counter != pokeCounter) {
                counter -= 12
            }

        }


        setSprite.innerText = "showdown sprite"
    } else {
        sprite = "showdown"



        counter = pokeCounter


        setSprite.innerText = "default sprite"
    }

    // if (randomMode) {
    //     pokeCounter = 0
    // } else {

    //     if (sortSwitch) {
    //         pokeCounter = 0
    //     } else {
    //         pokeCounter = 1025
    //     }
    // }

    setTimeout(displayPokemons(), 1500);

    setTimeout(() => {
        setSprite.disabled = false;
    }, 1500);

})

const mainSec = document.getElementById('main-sec')

function generateTab(pokemon, species) {

    localStorage.setItem('pokemonData', JSON.stringify(pokemon))
    localStorage.setItem('speciesData', JSON.stringify(species))


    window.open('poke_infos.html', '_blank')


    generateInfos()




}




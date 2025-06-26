

// data = pokemon

const card = document.querySelector('#poke-container')

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
let test = 0;

let searchOn = false;

// set pokedex from id 0 and so on at default
let firstRun = false;

// random the pokedex
let randomMode = false;

// sort bool // default
let sortSwitch = true;

//============================================== FIRST RUN
fetchData()

const sortingOptionClick = document.getElementById('sort-p')
const sortingOption = document.getElementById('sort-options')



sortingOptionClick.addEventListener('click', () => {

    sortingOption.classList.toggle('active')

})

sortLH.addEventListener('click', () => {

    setSprite.disabled = true;
    sortingOption.classList.toggle('active')


    pokeCounter = 0;
    sortSwitch = true;
    randomMode = false;
    card.innerHTML = ''
    fetchData()


    setTimeout(() => {
        setSprite.disabled = false;

    }, 1000);
})

sortHL.addEventListener('click', () => {



    setSprite.disabled = true;
    sortingOption.classList.toggle('active')

    pokeCounter = 1024;
    sortSwitch = false;
    randomMode = false;
    card.innerHTML = ''
    fetchData()

    setTimeout(() => {

        setSprite.disabled = false;

    }, 1000);

})

randomBtn.addEventListener('click', () => {


    setSprite.disabled = true;
    sortingOption.classList.toggle('active')


    randomMode = true;
    card.innerHTML = ''
    fetchData()

    setTimeout(() => {
        setSprite.disabled = false;
    }, 1000);
})




function loader() {

    // display loading gif
    loading.style.display = 'flex'

    // remove load button while data loading
    loadButton.style.display = 'none'
}





async function fetchData() {

    try {

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
        const data = await response.json();





        //random 
        if (randomMode) {
            for (let i = pokeCounter; i < pokeCounter + 12; i++) {
                fetchPokemonData(data.results[randomizer(1025, 1)])
            }
        } else {

            if (sortSwitch) {

                for (let i = pokeCounter; i < pokeCounter + 12; i++) {


                    fetchPokemonData(data.results[i])

                }

                pokeCounter += 12;

            } else {


                for (let i = 0; i < 12; i++) {

                    let j = pokeCounter - i

                    fetchPokemonData(data.results[j])


                }

                pokeCounter -= 12;



            }



        }




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

async function searchData() {
    try {
        searchOn = true

        card.innerHTML = ""
        card.style.justifyContent = "space-around"


        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${capitalizeFirstLetter(searchInput.value)}`)

        const data = await response.json()
        console.log(data)
        if (searchInput.value == "") {

            setTimeout(fetchData, 1500)

        } else {
            generatePokemon(data)
            pokeCounter = 0
        }



    }
    catch (error) {

    }

}



async function fetchPokemonData(pokemon) {
    const dataUrl = pokemon.url


    try {
        const response = await fetch(dataUrl)

        const data = await response.json()
        // console.log(data);
        console.log(data);
        generatePokemon(data);

    }
    catch (error) {
        console.log(error)
    }

}



async function generatePokemon(pokemon) {

    const pokeInfoBox = document.createElement('div')
    pokeInfoBox.classList.add('poke-info')

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

//randomized number

const randomizer = (max, min) => {

    const randomizedNum = Math.floor(Math.random() * (max - min + 1) + min)
    return randomizedNum
}

// enter button will hit search
searchInput.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        submitBtn.click()
    }
})





let sprite = "official-artwork"


setSprite.addEventListener('click', () => {


    setSprite.disabled = true;



    card.innerHTML = ""

    if (sprite == "showdown") {
        sprite = "official-artwork"
        setSprite.innerText = "showdown sprite"
    } else {
        sprite = "showdown"
        setSprite.innerText = "default sprite"
    }


    if (!sortSwitch) {
        pokeCounter = 1024;
    } else {
        pokeCounter = 0;
    }

    setTimeout(fetchData, 1500);

    setTimeout(() => {
        setSprite.disabled = false;
    }, 3000);

})





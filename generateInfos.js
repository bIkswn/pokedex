

const pokemon = JSON.parse(localStorage.getItem('pokemonData'))
const species = JSON.parse(localStorage.getItem('speciesData'))

const title = document.getElementById('title')

title.innerText = `${capitalizeFirstLetter(pokemon.name)} - Pokedex`

generateInfos()

function generateInfos() {

    const kupal = document.getElementById('pokeInfos')
    kupal.innerHTML = `

           <div class="pokeHead">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
                <h1 class="pokeName">${capitalizeFirstLetter(pokemon.name)}</h1>
                <p class="pokeID">${getID()}</p>
            </div>

           

            <div class="pokeDatas">

                <div class="data1">
                    <h3>height: ${computeHeight()}</h3>
                    <h3>weight: ${computeWeight()}</h3>
                    <h3>category: ${getCategory()}</h3>
                    <h3>gender: ${getGender()} </h3>
                    <h3>abilities: ${getAbilities()}</h3>
                </div>

                <div class="data2">
                    <h3 class="flexType">types:<ul class="type-flex" id="typeFlex"></ul></h3>
                    <h3>weaknesses:</h3>
                    <h3>versions:</h3>
                </div>

            </div>

`

    const typesList = document.getElementById('typeFlex');
    getTypes(pokemon, typesList)
    
}

function getID() {

    const pokeID = pokemon.id

    if (pokeID < 10) {
        return `#000${pokemon.id}`
    } else if (pokeID < 100) {
        return `#00${pokemon.id}`
    } else if (pokeID < 1000) {
        return `#0${pokemon.id}`
    } else {
        return `#${pokeID}`
    }

}

function getAbilities() {

    const pokemonAbilities = []

    pokemon.abilities.forEach(x => {

        pokemonAbilities.push(capitalizeFirstLetter(x.ability.name))
    });

    return pokemonAbilities.join(', ')

}


function computeHeight() {

    let defaultHeight = pokemon.height
    let meters = defaultHeight / 10;
    let feet = meters * 3.28084
    let decimalPart = feet % 1
    let inches = decimalPart * 12


    let finalInches = Math.round(inches)
    let totalFeet = Math.floor(feet)

    if (finalInches >= 12) {
        totalFeet += 1;
        finalInches = finalInches - 12;
    }



    if (finalInches < 10) {
        finalInches = `0${finalInches}`
    }

    let height = `${Math.floor(totalFeet)}' ${finalInches}"`
    return height
}

function computeWeight() {

    let defaultWeight = pokemon.weight
    let kg = defaultWeight / 10

    let pounds = kg * 2.20462;

    let weight = `${pounds.toFixed(1)} lbs`

    return weight
}



function getCategory() {

    const category = species.genera.find(x => x.language.name === "en")

    return category ? category.genus : "Unknown"

}

function getGender() {
    const gender = species.gender_rate

    if (gender === -1) {
        return "Unknown"
    } else if (gender === 0) {
        return "♂"
    } else if (gender === 8) {
        return "♀"
    } else {
        return "♂ ♀"
    }
}
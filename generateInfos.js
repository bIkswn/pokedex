
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
              <div class="line-div"></div>
                <p class="pokeID">${getID()}</p>
                 <h3 class="flexType">

                            <ul id="typeFlex"></ul>
                        </h3>
            </div>


     <div class="pokeDatas">



            <div class="batch-1">
            <h2 class="flavorTextHeader">${capitalizeFirstLetter(pokemon.name)}</h2>
   <p class="flavorText">
   ${getFlavorText()}
   </p>
            </div>

            <div class="batch-2">



                <div class="basic-stats">

                    <div class="data1">
                       <p>Profile</p>
                        <h3>height: ${computeHeight()}</h3>
                        <h3>weight: ${computeWeight()}</h3>
                        <h3>category: ${getCategory()}</h3>
                        <h3 class="genderText">gender: ${getGender()} </h3>
                        <h3>abilities: <br><span class="abilidad"> ${getAbilities()} </span></h3>

                        <h3>Weaknesses:
                          <ul id="weaknesses">
    
                        </ul>

                        </h3>
                       
                    
                    </div>

                </div>

                
                <div class="" id="stats">
                    <p>Stats</p>

                </div>

               

            </div>
        </div>

    </div>

`
    const typesList = document.getElementById('typeFlex');
    const abilidad = document.querySelector('.abilidad')
    abilidad.style.color = typeBg[pokemon.types[0].type.name]


    getTypes(pokemon, typesList)
    displayWeaknesses()
    getStats()


}

function getFlavorText() {

    const v9 = species.flavor_text_entries.find(entry =>
        entry.version.url.includes("version/22")
    )

    if (v9) {
        return v9.flavor_text
    } else {

        const defaultText = species.flavor_text_entries.find(
            entry => entry.language.name.includes('en')
        )

        return defaultText.flavor_text
    }

}




function getStats() {
    const statsContainer = document.getElementById('stats')

    const statsObject = {}
    pokemon.stats.forEach(stats => {

        statsObject[stats.stat.name] = stats.base_stat;


    });


    Object.entries(statsObject).forEach(([statName, statValue]) => {
        const statsBox = document.createElement('div');
        statsBox.classList.add('statBox')
        statsBox.innerText = `${capitalizeFirstLetter(statName)}: `




        const baseProg = document.createElement('div')
        baseProg.classList.add('base-progress')

        const mainProg = document.createElement('div')
        mainProg.classList.add('progress')

        mainProg.style.width = `${statValue}%`
        mainProg.innerText = `${statValue}`

        statsBox.append(baseProg, mainProg)
        statsContainer.append(statsBox)

    })

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

        pokemonAbilities.push(`&bullet; ${capitalizeFirstLetter(x.ability.name)}`)
    });



    return pokemonAbilities.join('<br>')

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

    return category ? category.genus.replace('Pokémon', '') : "Unknown"

}

function getGender() {
    const gender = species.gender_rate

    if (gender === -1) {
        return "Unknown"
    } else if (gender === 0) {
        return `<i style="color: #3498db; font-size: 30px;" class="fa-solid fa-mars"></i> `
    } else if (gender === 8) {
        return `
        <i style="color: #C70039; font-size: 30px;" class="fa-solid fa-venus"></i>`
    } else {
        return `<i style="color: #C70039; font-size: 30px;" class="fa-solid fa-mars"></i> 

        <i style="color: #3498db; font-size: 30px;" class="fa-solid fa-venus"></i>`
    }
}

function displayWeaknesses() {
    const weak = getWeaknesses(pokemon)
    const weaknessesContainer = document.getElementById('weaknesses')

    weak.forEach(element => {

        const pokeType = document.createElement('li');
        pokeType.style.background = typeBg[element]
        pokeType.style.color = typeColors[element]

        pokeType.innerText = capitalizeFirstLetter(element)
        weaknessesContainer.append(pokeType)
    });
}



function getWeaknesses(pokemon) {

    const typeChart = {

        normal: { weakTo: ['fighting'], resistsTo: [], immuneTo: ['ghost'] },
        fire: { weakTo: ['water', 'ground', 'rock'], resistsTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immuneTo: [] },
        water: { weakTo: ['electric', 'grass'], resistsTo: ['fire', 'water', 'ice', 'steel'], immuneTo: [] },
        electric: { weakTo: ['ground'], resistsTo: ['electric', 'flying', 'steel'], immuneTo: [] },
        grass: { weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'], resistsTo: ['water', 'electric', 'grass', 'ground'], immuneTo: [] },
        ice: { weakTo: ['fire', 'fighting', 'rock', 'steel'], resistsTo: ['ice'], immuneTo: [] },
        fighting: { weakTo: ['flying', 'psychic', 'fairy'], resistsTo: ['bug', 'rock', 'dark'], immuneTo: ['ghost'] },
        poison: { weakTo: ['ground', 'psychic'], resistsTo: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immuneTo: [] },
        ground: { weakTo: ['water', 'grass', 'ice'], resistsTo: ['poison', 'rock'], immuneTo: ['electric'] },
        flying: { weakTo: ['electric', 'ice', 'rock'], resistsTo: ['grass', 'fighting', 'bug'], immuneTo: ['ground'] },
        psychic: { weakTo: ['bug', 'ghost', 'dark'], resistsTo: ['fighting', 'psychic'], immuneTo: [] },
        bug: { weakTo: ['fire', 'flying', 'rock'], resistsTo: ['grass', 'fighting', 'ground'], immuneTo: [] },
        rock: { weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'], resistsTo: ['normal', 'fire', 'poison', 'flying'], immuneTo: [] },
        ghost: { weakTo: ['ghost', 'dark'], resistsTo: ['poison', 'bug'], immuneTo: ['normal', 'fighting'] },
        dragon: { weakTo: ['ice', 'dragon', 'fairy'], resistsTo: ['fire', 'water', 'electric', 'grass'], immuneTo: [] },
        ghost: { weakTo: ['ghost', 'dark'], resistsTo: ['poison', 'bug'], immuneTo: ['normal', 'fighting'] },
        dragon: { weakTo: ['ice', 'dragon', 'fairy'], resistsTo: ['fire', 'water', 'electric', 'grass'], immuneTo: [] },
        dark: { weakTo: ['fighting', 'bug', 'fairy'], resistsTo: ['ghost', 'dark'], immuneTo: ['psychic'] },
        steel: { weakTo: ['fire', 'fighting', 'ground'], resistsTo: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immuneTo: ['poison'] },
        fairy: { weakTo: ['poison', 'steel'], resistsTo: ['fighting', 'bug', 'dark'], immuneTo: ['dragon'] }

    };

    const pokemonType = pokemon.types.map(x => x.type.name)

    let effectiveness = {}

    Object.keys(typeChart).forEach(element => {
        effectiveness[element] = 1;
    });

    pokemonType.forEach(type => {

        const defType = typeChart[type]

        defType.weakTo.forEach(element => {
            effectiveness[element] *= 2;
        });


        defType.resistsTo.forEach(element => {
            effectiveness[element] *= .5
        })

        defType.immuneTo.forEach(element => {
            effectiveness[element] = 0
        })



    })

    const weaknesses = Object.entries(effectiveness).filter(
        ([type, value]) => value >= 2
    ).map(([type, value]) => type)

    return weaknesses
}





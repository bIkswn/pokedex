
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
                 <h3 class="flexType">

                            <ul id="typeFlex"></ul>
                        </h3>
            </div>


     <div class="pokeDatas">



            <div class="batch-1">
   <h3 class="flavorText">
   ${capitalizeFirstLetter(pokemon.name)}
   <br>
   ${getFlavorText()}
   </h3>
            </div>

            <div class="batch-2">



                <div class="basic-stats">

                    <div class="data1">
                       <p>Profile</p>
                        <h3>height: ${computeHeight()}</h3>
                        <h3>weight: ${computeWeight()}</h3>
                        <h3>category: ${getCategory()}</h3>
                        <h3 class="genderText">gender: ${getGender()} </h3>
                        <h3>abilities: ${getAbilities()}</h3>
                       
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
    getTypes(pokemon, typesList)

    getStats()

}

function getFlavorText() {

    const v9 = species.flavor_text_entries.find(entry =>
        entry.version.url.includes("version/22")
    )

    if (v9) {
        return v9.flavor_text
    } else {
        return "tite"
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


const dataset = {
    normal: {
        strongAgainst: [],
        weakAgainst: ['rock', 'ghost', 'steel'],
        resistant: ['ghost'],
        vulnerableTo: ['fighting']
    },
    fighting: {
        strongAgainst: ['normal', 'rock', 'steel', 'ice', 'dark'],
        weakAgainst: ['flying', 'poison', 'psychic', 'bug', 'ghost', 'fairy'],
        resistant: ['rock', 'bug', 'dark'],
        vulnerableTo: ['flying', 'psychic', 'fairy']
    },
    flying: {
        strongAgainst: ['fighting', 'bug', 'grass'],
        weakAgainst: ['rock', 'steel', 'electric'],
        resistant: ['fighting', 'ground', 'bug', 'grass'],
        vulnerableTo: ['rock', 'electric', 'ice']
    },
    poison: {
        strongAgainst: ['grass', 'fairy'],
        weakAgainst: ['poison', 'ground', 'rock', 'ghost', 'steel'],
        resistant: ['fighting', 'poison', 'grass', 'fairy'],
        vulnerableTo: ['ground', 'psychic']
    },
    ground: {
        strongAgainst: ['poison', 'rock', 'steel', 'fire', 'electric'],
        weakAgainst: ['flying', 'bug', 'grass'],
        resistant: ['poison', 'rock', 'electric'],
        vulnerableTo: ['water', 'grass', 'ice']
    },
    rock: {
        strongAgainst: ['flying', 'bug', 'fire', 'ice'],
        weakAgainst: ['fighting', 'ground', 'steel'],
        resistant: ['normal', 'flying', 'poison', 'fire'],
        vulnerableTo: ['fighting', 'ground', 'steel', 'water', 'grass']
    },
    bug: {
        strongAgainst: ['grass', 'psychic', 'dark'],
        weakAgainst: ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
        resistant: ['fighting', 'ground', 'grass'],
        vulnerableTo: ['flying', 'rock', 'fire']
    },
    ghost: {
        strongAgainst: ['ghost', 'psychic'],
        weakAgainst: ['normal', 'dark'],
        resistant: ['normal', 'fighting', 'poison', 'bug'],
        vulnerableTo: ['ghost', 'dark']
    },
    steel: {
        strongAgainst: ['rock', 'ice', 'fairy'],
        weakAgainst: ['steel', 'fire', 'water', 'electric'],
        resistant: ['normal', 'flying', 'poison', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
        vulnerableTo: ['fighting', 'ground', 'fire']
    },
    fire: {
        strongAgainst: ['bug', 'steel', 'grass', 'ice'],
        weakAgainst: ['rock', 'fire', 'water', 'dragon'],
        resistant: ['bug', 'steel', 'fire', 'grass', 'ice'],
        vulnerableTo: ['ground', 'rock', 'water']
    },
    water: {
        strongAgainst: ['ground', 'rock', 'fire'],
        weakAgainst: ['water', 'grass', 'dragon'],
        resistant: ['steel', 'fire', 'water', 'ice'],
        vulnerableTo: ['grass', 'electric']
    },
    grass: {
        strongAgainst: ['ground', 'rock', 'water'],
        weakAgainst: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
        resistant: ['ground', 'water', 'grass', 'electric'],
        vulnerableTo: ['flying', 'poison', 'bug', 'fire', 'ice']
    },
    electric: {
        strongAgainst: ['flying', 'water'],
        weakAgainst: ['ground', 'grass', 'electric', 'dragon'],
        resistant: ['flying', 'steel', 'electric'],
        vulnerableTo: ['ground']
    },
    psychic: {
        strongAgainst: ['fighting', 'poison'],
        weakAgainst: ['steel', 'psychic', 'dark'],
        resistant: ['fighting', 'psychic'],
        vulnerableTo: ['bug', 'ghost', 'dark']
    },
    ice: {
        strongAgainst: ['flying', 'ground', 'grass', 'dragon'],
        weakAgainst: ['steel', 'fire', 'water', 'ice'],
        resistant: ['ice'],
        vulnerableTo: ['fighting', 'rock', 'steel', 'fire']
    },
    dragon: {
        strongAgainst: ['dragon'],
        weakAgainst: ['steel', 'fairy'],
        resistant: ['fire', 'water', 'grass', 'electric'],
        vulnerableTo: ['ice', 'dragon', 'fairy']
    },
    fairy: {
        strongAgainst: ['fighting', 'dragon', 'dark'],
        weakAgainst: ['poison', 'steel', 'fire'],
        resistant: ['fighting', 'bug', 'dragon', 'dark'],
        vulnerableTo: ['poison', 'steel']
    },
    dark: {
        strongAgainst: ['ghost', 'psychic'],
        weakAgainst: ['fighting', 'dark', 'fairy'],
        resistant: ['ghost', 'psychic', 'dark'],
        vulnerableTo: ['fighting', 'bug', 'fairy']
    }
}

const { uniquify } = require('../../helpers');

// function uniquify(arr, compareFn) {
//     return [...arr].reduce((list, entry) => {
//         return list.indexOf(entry) === -1 ? [...list, entry] : list
//     }, [])
// }

function getDoubleVulnerability(arr) {
    return arr.reduce((list, type) => {
        const doubleVulnerable = arr.filter((t) => type === t).length > 1;
        return doubleVulnerable ? [...list, type] : list;
    }, [])
}

function combineTypes(types) {
    const type1Data = dataset[types[0]];
    const type2Data = dataset[types[1]];
    const combinedResistance = [...type1Data.resistant, ...type2Data.resistant];
    const combinedVulnerability = [...type1Data.vulnerableTo, ...type2Data.vulnerableTo];
    const resistancePerType = {
        [types[0]]: type1Data.strongAgainst,
        [types[1]]: type2Data.strongAgainst
    };
    const combinedResistanceAndVulnerability = combinedResistance.reduce((list, type) => {
        if (list.vulnerableTo.indexOf(type) > -1) {
            list.resistant = list.resistant.filter((t) => t !== type);
            list.vulnerableTo = list.vulnerableTo.filter((t) => t !== type);
        }
        return list;
    }, {
        resistant: combinedResistance,
        vulnerableTo: combinedVulnerability
    });
    const { vulnerableTo, resistant } = combinedResistanceAndVulnerability;
    return {
        strongAgainst: uniquify([...type1Data.strongAgainst, ...type2Data.strongAgainst]),
        weakAgainst: uniquify([...type1Data.weakAgainst, ...type2Data.weakAgainst]),
        vulnerableTo: uniquify(vulnerableTo),
        resistant: uniquify(resistant),
        doubleVulnerability: uniquify(getDoubleVulnerability(vulnerableTo)),
        resistancePerType,
    }
}

function getTypeData(typeToCheck) {
    const typesFormatted = typeToCheck.replace(/\s/g, '').toLowerCase();
    const typesToCheck = typesFormatted.split('/');
    let typeData;

    if (typesToCheck.length === 1) {
        typeData = dataset[typesToCheck[0]];
        console.log('typeData', typeData);
    } else {
        typeData = combineTypes(typesToCheck);
    }
    return typeData;
}

exports.handler = async (event) => {
    const type = event.queryStringParameters.type || null;
    const res = getTypeData(type);
    // if > 2 types --> error
    // if no type ==> error
    // if typo / type can not found --> error
    return {
        statusCode: 200,
        body: JSON.stringify(res),
    };
};
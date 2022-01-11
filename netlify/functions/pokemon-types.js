const dataset = {
    normal: {
        strongAgainst: [],
        weakAgainst: ['rock', 'ghost', 'steel'],
        resistant: ['ghost'],
        VulnerableTo: ['fighting']
    },
    fighting: {
        strongAgainst: ['normal', 'rock', 'steel', 'ice', 'dark'],
        weakAgainst: ['flying', 'poison', 'psychic', 'bug', 'ghost', 'fairy'],
    },
    flying: {
        strongAgainst: ['fighting', 'bug', 'grass'],
        weakAgainst: ['rock', 'steel', 'electric'],
        resistant: ['fighting', 'ground', 'bug', 'grass'],
        VulnerableTo: ['rock', 'electric', 'ice']
    },
    poison: {
        strongAgainst: ['grass', 'fairy'],
        weakAgainst: ['poison', 'ground', 'rock', 'ghost', 'steel'],
        resistant: ['fighting', 'poison', 'grass', 'fairy'],
        VulnerableTo: ['ground', 'psychic']
    },
    ground: {
        strongAgainst: ['poison', 'rock', 'steel', 'fire', 'electric'],
        weakAgainst: ['flying', 'bug', 'grass'],
        resistant: ['poison', 'rock', 'electric'],
        VulnerableTo: ['water', 'grass', 'ice']
    },
    rock: {
        strongAgainst: ['flying', 'bug', 'fire', 'ice'],
        weakAgainst: ['fighting', 'ground', 'steel'],
        resistant: ['normal', 'flying', 'poison', 'fire'],
        VulnerableTo: ['fighting', 'ground', 'steel', 'water', 'grass']
    },
    bug: {
        strongAgainst: ['grass', 'psychic', 'dark'],
        weakAgainst: ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
        resistant: ['fighting', 'ground', 'grass'],
        VulnerableTo: ['flying', 'rock', 'fire']
    },
    ghost: {
        strongAgainst: ['ghost', 'psychic'],
        weakAgainst: ['normal', 'dark'],
        resistant: ['normal', 'fighting', 'poison', 'bug'],
        VulnerableTo: ['ghost', 'dark']
    },
    steel: {
        strongAgainst: ['rock', 'ice', 'fairy'],
        weakAgainst: ['steel', 'fire', 'water', 'electric'],
        resistant: ['normal', 'flying', 'poison', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
        VulnerableTo: ['fighting', 'ground', 'fire']
    },
    fire: {
        strongAgainst: ['bug', 'steel', 'grass', 'ice'],
        weakAgainst: ['rock', 'fire', 'water', 'dragon'],
        resistant: ['bug', 'steel', 'fire', 'grass', 'ice'],
        VulnerableTo: ['ground', 'rock', 'water']
    },
    water: {
        strongAgainst: ['ground', 'rock', 'fire'],
        weakAgainst: ['water', 'grass', 'dragon'],
        resistant: ['fire', 'water', 'ice'],
        VulnerableTo: ['grass', 'electric']
    },
    grass: {
        strongAgainst: ['ground', 'rock', 'water'],
        weakAgainst: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
        resistant: ['ground', 'water', 'grass', 'electric'],
        VulnerableTo: ['flying', 'poison', 'bug', 'fire', 'ice']
    },
    electric: {
        strongAgainst: ['flying', 'water'],
        weakAgainst: ['ground', 'grass', 'electric', 'dragon'],
        resistant: ['flying', 'steel', 'electric'],
        VulnerableTo: ['ground']
    },
    psychic: {
        strongAgainst: ['fighting', 'poison'],
        weakAgainst: ['steel', 'psychic', 'dark'],
        resistant: ['fighting', 'psychic'],
        VulnerableTo: ['bug', 'ghost', 'dark']
    },
    ice: {
        strongAgainst: ['flying', 'ground', 'grass', 'dragon'],
        weakAgainst: ['steel', 'fire', 'water', 'ice'],
        resistant: ['ice'],
        VulnerableTo: ['fighting', 'rock', 'steel', 'fire']
    },
    dragon: {
        strongAgainst: ['dragon'],
        weakAgainst: ['steel', 'fairy'],
        resistant: ['fire', 'water', 'grass', 'electric'],
        VulnerableTo: ['ice', 'dragon', 'fairy']
    },
    fairy: {
        strongAgainst: ['fighting', 'dragon', 'dark'],
        weakAgainst: ['poison', 'steel', 'fire'],
        resistant: ['fighting', 'bug', 'dragon', 'dark'],
        VulnerableTo: ['poison', 'steel']
    },
    dark: {
        strongAgainst: ['ghost', 'psychic'],
        weakAgainst: ['fighting', 'dark', 'fairy'],
        resistant: ['ghost', 'psychic', 'dark'],
        VulnerableTo: ['fighting', 'bug', 'fairy']
    }
}

function uniquify(arr) {
    return [...arr].reduce((list, entry) => {
        return list.indexOf(entry) === -1 ? [...list, entry] : list
    }, [])
}

function count(arr) {
    return arr.reduce((occurance, entry) => {
        return list.indexOf(entry) === -1 ? [...list, entry] : list
    }, 0)
}

function combineTypes(types) {
    const type1Data = dataset[types[0]];
    const type2Data = dataset[types[1]];
    const combinedResistance = [...type1Data.resistant, ...type2Data.resistant];
    const combinedVulnerability = [...type1Data.VulnerableTo, ...type2Data.VulnerableTo];
    const resAndVulCombined = combinedResistance.reduce((list, type) => {
        if (list.VulnerableTo.indexOf(type) > -1) {
            list.resistant = list.resistant.filter((t) => t !== type);
            list.VulnerableTo = list.VulnerableTo.filter((t) => t !== type);
        }
        return list;
    }, {
        resistant: combinedResistance,
        VulnerableTo: combinedVulnerability
    });
    console.log('resAndVulCombined.VulnerableTo', resAndVulCombined.VulnerableTo);
    return {
        strongAgainst: uniquify([...type1Data.strongAgainst, ...type2Data.strongAgainst]),
        weakAgainst: uniquify([...type1Data.weakAgainst, ...type2Data.weakAgainst]),
        VulnerableTo: uniquify(resAndVulCombined.VulnerableTo),
        resistant: uniquify(resAndVulCombined.resistant)
    }
}

function getTypeData(typeToCheck) {
    const typesFormatted = typeToCheck.replace(/\s/g, '').toLowerCase();
    const typesToCheck = typesFormatted.split('/');
    let typeData;

    if (typesToCheck.length === 1) {
        typeData = dataset[typesToCheck[0]];
    } else {
        typeData = combineTypes(typesToCheck);
    }
    return typeData;
}

exports.handler = async (event) => {
    const type = event.queryStringParameters.type || null;
    const res = getTypeData(type);
    console.log('res', res)
    return {
        statusCode: 200,
        body: JSON.stringify(res),
    };
};
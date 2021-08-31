const axios = require('axios');

class Searches {

    history = [];


    constructor(){
        // TODO: read from DB 
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_TOKEN,
            'limit': 5,
            'language': 'en'
        }
    }


    async findCity(city = ''){

        try {
        //request http
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
            params: this.paramsMapBox

        });

        const resp = await instance.get();

        console.log(resp.data);

        return []; //return a list of cities that match the user input
        } catch (error) {

            return [];
        }


    }
}

module.exports = Searches;
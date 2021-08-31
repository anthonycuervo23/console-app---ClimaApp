const fs = require('fs');
const axios = require('axios');

class Searches {

    history = [];
    path = './db/history.json'

    constructor(){
        // read from DB 
        this.readDB();
    }

    //show cities capitalized in history.
    get capitalizedHistory(){
        return this.history.map((city) =>{

            let words = city.split(' ');
            words = words.map((word)=> word[0].toUpperCase() + word.substring(1));

            return words.join(' ');

        });
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

        return resp.data.features.map((city) =>({
            id: city.id,
            name: city.place_name,
            lng: city.center[0],
            lat: city.center[1],
        }));

        } catch (error) {

            return [];
        }


    }

    async weatherByCoordenates(lat, lng){
        try {
        
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    'lat': lat,
                    'lon': lng,
                    'appid': process.env.OPENWHEATER_KEY,
                    'units':'metric'
                }
            });

            const resp = await instance.get();
            //desestructuracion de objetos mediante llaves
            const {weather, main} = resp.data; 
            return {
                weather: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
            
        } catch (error) {
            console.log(error);
        }
    }

    addToHistory(city = '') {

        //add city to list only  if doesnt exist in list
        if(this.history.includes(city.toLocaleLowerCase())){
            return;
        }

        //display only the last 6 cities from history list
        this.history = this.history.splice(0,5);

        this.history.unshift(city.toLocaleLowerCase());

        //save to DB
        this.saveToDB();
    }

    saveToDB(){

        const data = {
            history: this.history
        };
        
        fs.writeFileSync(this.path, JSON.stringify(data));

    }

    readDB(){

        if(!fs.existsSync(this.path)){
            return null;
        }

        const history = fs.readFileSync(this.path, {enconding: 'utf-8'});
        const data = JSON.parse(history);
        this.history = data.history;
    }
}

module.exports = Searches;
const {inquirerMenu, pause, readInput, showCities} = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('dotenv').config();
require('colors');

const main = async() =>{

    const searches = new Searches();

    let answer;

    

    do {
        
        answer = await inquirerMenu();

        switch (answer) {
            case 1:
                console.log();
                //Show message
                const city = await readInput('Please type a city: ');
                //Find city 
                const cities  = await searches.findCity(city);
                //choose a result 
                const selectedID = await showCities(cities);
                if(selectedID === '0') continue;

                const selectedCity = cities.find((city)=> city.id === selectedID);

                //save result in DB
                searches.addToHistory(selectedCity.name);

                //request weather
                const weather = await searches.weatherByCoordenates(selectedCity.lat, selectedCity.lng);
                // show the result
                console.clear();
                console.log('\n======================'.green);
                console.log('   City Information');
                console.log('======================\n'.green);
                console.log('City: ', selectedCity.name.green);
                console.log('Lat: ', selectedCity.lat);
                console.log('Lng: ', selectedCity.lng);
                console.log('Weather: ', weather.weather.green);
                console.log('Temp: ', weather.temp);
                console.log('Min: ', weather.min);
                console.log('Max: ', weather.max);


            break;
        
            case 2:
            console.log();
            searches.capitalizedHistory.forEach((city, i) =>{
                const index = `${i + 1}.`.green;
                console.log(`${index} ${city}`);
            });

            break;
        }


        if(answer !== 0) await pause();

    } while (answer !== 0);

}

main();
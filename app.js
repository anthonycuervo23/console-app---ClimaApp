const {inquirerMenu, pause, readInput} = require('./helpers/inquirer');
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
                searches.findCity(city);

                //Find city 

                //choose a result 

                //request weather

                // show the result
                console.log('\nCity Information\n'.green);
                console.log('City: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
                console.log('Temp: ', );
                console.log('Min: ', );
                console.log('Max: ', );


            break;
        
            default:
                break;
        }


        if(answer !== 0) await pause();

    } while (answer !== 0);

}

main();
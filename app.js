const {readInput} = require('./helpers/inquirer');
require('colors');

const main = async() =>{

    const input = await readInput('Type something: ');

    console.log(input.red);

}

main();
const inquirer = require('inquirer');
require('colors');


const menuOptions = [

    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green } Find a city`
            },
            {
                value: 2,
                name: `${'2.'.green } History`
            },
            {
                value: 0,
                name: `${'0.'.green } EXIT`
            },
        ]
    }

];



const inquirerMenu = async() =>{

    console.clear();
    console.log('======================'.green);
    console.log('   Choose an option');
    console.log('======================\n'.green);

    const {option} = await inquirer.prompt(menuOptions);

    return option;

}

const pause = async() =>{

    const pause = [
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green} to continue`,
        }
    ];
   console.log('\n');
    await inquirer.prompt(pause);
}

const readInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'description',
            message: message,
            validate(value) {
                if(value.length === 0){
                    return 'Please enter a value';
                }
                return true;
                
              },
        }
    ];
    const {description} = await inquirer.prompt(question);
    return description;

}


const listOfTodosToDelete = async(todos = []) => {

    const choices = todos.map((todo, i) => {

        const index = `${i + 1}.`.green

        return {
            value: todo.id,
            name: `${index} ${todo.description}`,
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices: choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;

}

const confirm = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
    
}

const showCheckListTodos = async(todos = []) => {

    const choices = todos.map((todo, i) => {

        const index = `${i + 1}.`.green

        return {
            value: todo.id,
            name: `${index} ${todo.description}`,
            checked: (todo.completedOn) ? true : false,
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'select one or more',
            choices: choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;

}


module.exports = {inquirerMenu, 
    pause, 
    readInput, 
    listOfTodosToDelete,
    confirm,
    showCheckListTodos,
}
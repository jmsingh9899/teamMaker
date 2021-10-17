const Engineer = require('./lib/Engineer');
const Intern = require("./lib/Intern");
const Manager = require('./lib/Manager');
const generateHtml = require("./util/generateHtml");
const inquirer = require('inquirer');
const fs = require('fs');

const team = [];

getManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is their name?',
            name: 'user'
        },
        {
            type: 'input',
            message: 'What is their id number?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is their email?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'What is their office number?',
            name: 'officeNum'
        }
    ]).then((response) => {
        const newManager = new Manager(response.user, response.id, response.email,
            response.officeNum)
            makeTeam();
            team.push(newManager)
    })
}

getEngineer = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is their name?',
            name: 'user'
        },
        {
            type: 'input',
            message: 'What is their id number?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is their email?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'What is their Github?',
            name: 'github'
        }
    ]).then((response) => {
        const newEngineer = new Engineer(response.user, response.id, response.email,
            response.github)
            makeTeam();
            team.push(newEngineer)
    })
}

getIntern = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is their name?',
            name: 'user'
        },
        {
            type: 'input',
            message: 'What is their id number?',
            name: 'id'
        },
        {
            type: 'input',
            message: 'What is their email?',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Where did they go to school?',
            name: "school"
        }
    ]).then((response) => {
        const newIntern = new Intern(response.user, response.id, response.email,
            response.school)
            makeTeam();
            team.push(newIntern)
    })
}

makeTeam = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "Who would you like to add to your team?",
            name: 'role',
            choices: [
                "Manager", "Engineer", "Intern", "No more employees to add"
            ]
        }
    ]).then((response) => {
        switch (response.role) {
            case "Manager":
                getManager();
                break;
            case "Engineer":
                getEngineer();
                break;
            case "Intern":
                getIntern();
                break;
            case "No more employees to add":
                fs.writeFile('index.html', `${generateHtml(team)}`, (err) => err ? console.error(err) : console.log('Commit logged!'));
                break;
                
        }
    })
}

inquirer.prompt([
    {
        type: 'confirm',
        message: "Are you ready to begin making your team",
        name: 'begin'
    }
]).then((response) => {
    if (response.begin) {
        makeTeam();
    }
})
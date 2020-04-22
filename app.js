const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?"
    },
    {
        type: "list",
        name: "team",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add anymore team members."]
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your engineer's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's github username?"
    },
    {
        type: "list",
        name: "team",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add anymore team members."]
    }
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "What is your intern's school?"
    },
    {
        type: "list",
        name: "team",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add anymore team members."]
    }
];


function managerPrompt() {
    inquirer.prompt(managerQuestions).then(answers => {
        if(answers.team === managerQuestions[4].choices[0]) {
            engineerPrompt();
            const employee = new Employee(answers.name, answers.id, answers.email);
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            teamMembers.push(manager);
            
        } else if(answers.team === managerQuestions[4].choices[1]) {
            internPrompt();
            const employee = new Employee(answers.name, answers.id, answers.email);
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            teamMembers.push(manager);
            
        } else {
            const employee = new Employee(answers.name, answers.id, answers.email);
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            teamMembers.push(manager);
            fs.writeFileSync(outputPath, render(teamMembers), function(err) {
                if(err) {
                    throw err;
                }
                console.log("success");
            })
        }
    })
}


function engineerPrompt() {
    inquirer.prompt(engineerQuestions).then(answers => {
        if(answers.team === engineerQuestions[4].choices[0]) {
            engineerPrompt();
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
        } else if(answers.team === engineerQuestions[4].choices[1]) {
            internPrompt();
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
        } else {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
            fs.writeFileSync(outputPath, render(teamMembers), function(err) {
                if(err) {
                    throw err
                }
                console.log("success");
            })
        }
    })
}


function internPrompt() {
    inquirer.prompt(internQuestions).then(answers => {
        if(answers.team === internQuestions[4].choices[0]) {
            engineerPrompt();
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
        } else if(answers.team === internQuestions[4].choices[1]) {
            internPrompt();
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
        } else {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            fs.writeFileSync(outputPath, render(teamMembers), function(err) {
                if(err) {
                    throw err
                }
                console.log("success");
            })
        }
    })
}

managerPrompt();
class Employee {
    constructor(name, id, email) {
        this.name = name,
        this.id = id,
        this.email = email
    }
    getName(name) {
        //get name function
    }
    getID(id) {
        //get id function
    }
    getEmail(email) {
        //get email function
    }
    getRole() {
        return Employee;
    }
}


module.exports = Employee;
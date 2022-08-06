/*

    We are working on a security system for a badged-access room in our company's building.

    Given an ordered list of employees who used their badge to enter or exit the room, write a function that returns two collections:

    1. All employees who didn't use their badge while exiting the room - they recorded an enter without a matching exit. (All employees are required to leave the room before the log ends.)
    2. All employees who didn't use their badge while entering the room - they recorded an exit without a matching enter. (The room is empty when the log begins.)

    Each collection should contain no duplicates, regardless of how many times a given employee matches the criteria for belonging to it.

    records1 = [
      ["Martha",   "exit"],
      ["Paul",     "enter"],
      ["Martha",   "enter"],
      ["Steve",    "enter"],
      ["Martha",   "exit"],
      ["Jennifer", "enter"],
      ["Paul",     "enter"],
      ["Curtis",   "exit"],
      ["Curtis",   "enter"],
      ["Paul",     "exit"],
      ["Martha",   "enter"],
      ["Martha",   "exit"],
      ["Jennifer", "exit"],
      ["Paul",     "enter"],
      ["Paul",     "enter"],
      ["Martha",   "exit"],
      ["Paul",     "enter"],
      ["Paul",     "enter"],
      ["Paul",     "exit"],
      ["Paul",     "exit"] 
    ]

    Expected output: ["Paul", "Curtis", "Steve"], ["Martha", "Curtis", "Paul"]

    Other test cases:

    records2 = [
      ["Paul", "enter"],
      ["Paul", "exit"],
    ]

    Expected output: [], []

    records3 = [
      ["Paul", "enter"],
      ["Paul", "enter"],
      ["Paul", "exit"],
      ["Paul", "exit"],
    ]

    Expected output: ["Paul"], ["Paul"]

    records4 = [
      ["Paul", "enter"],
      ["Paul", "exit"],
      ["Paul", "exit"],
      ["Paul", "enter"],
    ]

    Expected output: ["Paul"], ["Paul"]

    All Test Cases:
    mismatches(records1) => ["Paul", "Curtis", "Steve"], ["Martha", "Curtis", "Paul"]
    mismatches(records2) => [], []
    mismatches(records3) => ["Paul"], ["Paul"]
    mismatches(records4) => ["Paul"], ["Paul"]

    n: length of the badge records array

*/

records1 = [
    ['Martha', 'exit'],
    ['Paul', 'enter'],
    ['Martha', 'enter'],
    ['Steve', 'enter'],
    ['Martha', 'exit'],
    ['Jennifer', 'enter'],
    ['Paul', 'enter'],
    ['Curtis', 'exit'],
    ['Curtis', 'enter'],
    ['Paul', 'exit'],
    ['Martha', 'enter'],
    ['Martha', 'exit'],
    ['Jennifer', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'enter'],
    ['Martha', 'exit'],
    ['Paul', 'enter'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'exit'],
];

records2 = [
    ['Paul', 'enter'],
    ['Paul', 'exit'],
];

records3 = [
    ['Paul', 'enter'],
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'exit'],
];

records4 = [
    ['Paul', 'enter'],
    ['Paul', 'exit'],
    ['Paul', 'exit'],
    ['Paul', 'enter'],
];

const mismatches = records => {

    const records_ = records.map(record => ({
        employee: record[0],
        action: record[1],
    }));

    const employees = [...new Set(records_.map(record => record.employee))]

    let employeesState = Object.assign(
        {},
        ...employees.map(employee => ({ [employee]: null }))
    );

    const employeesRecords = employees.map(
        employee => records_.filter(record => record.employee === employee)
    );

    let missingExitEmployees = new Set();
    let missingEnterEmployees = new Set();

    for (const employeeRecords of employeesRecords) {

        for (let i = 0; i < employeeRecords.length; i++) {

            const { employee, action } = employeeRecords[i];
            const currentEmployeeState = employeesState[employee];
            const isLastEmployeeRecord = i + 1 == employeeRecords.length;

            if (action === "enter") {

                if (currentEmployeeState === "enter" || isLastEmployeeRecord == true) {
                    missingExitEmployees.add(employee);
                }

            } else if (action === "exit") {

                if (currentEmployeeState !== "enter") {
                    missingEnterEmployees.add(employee);
                }

            }

            employeesState[employee] = action;

        }

    }

    return [
        [...missingExitEmployees],
        [...missingEnterEmployees]
    ]

};

console.log(mismatches(records1));
console.log(mismatches(records2));
console.log(mismatches(records3));
console.log(mismatches(records4));
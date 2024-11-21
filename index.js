const fs = require('fs');
const path = require('path');
const readline = require('readline');


const filePath = path.join(__dirname, 'tasks.txt');


if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function readTasks() {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : [];
}

function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}


function showMenu() {
    console.log('\nTask Manager:');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');
    rl.question('Choose an option: ', handleInput);
}

function handleInput(option) {
    switch (option.trim()) {
        case '1':
            rl.question('Enter the new task: ', addTask);
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            viewTasks(true);
            rl.question('Enter the task number to mark as complete: ', markComplete);
            break;
        case '4':
            viewTasks(true);
            rl.question('Enter the task number to remove: ', removeTask);
            break;
        case '5':
            console.log('Thanks Geekster!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please try again.');
            showMenu();
    }
}


function addTask(task) {
    const tasks = readTasks();
    tasks.push({ task, completed: false });
    writeTasks(tasks);
    console.log('Task added successfully!');
    showMenu();
}

function viewTasks(showIndex = false) {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        console.log('\nTasks:');
        tasks.forEach((t, index) => {
            console.log(
                `${showIndex ? index + 1 + '. ' : ''}${t.task} [${t.completed ? 'Completed' : 'Pending'}]`
            );
        });
    }
    if (!showIndex) showMenu();
}

function markComplete(index) {
    const tasks = readTasks();
    index = parseInt(index) - 1;
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        writeTasks(tasks);
        console.log('Task marked as complete!');
    } else {
        console.log('Invalid task number.');
    }
    showMenu();
}

function removeTask(index) {
    const tasks = readTasks();
    index = parseInt(index) - 1;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        writeTasks(tasks);
        console.log('Task removed successfully!');
    } else {
        console.log('Invalid task number.');
    }
    showMenu();
}


showMenu();

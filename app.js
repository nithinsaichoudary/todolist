document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#input');
    const button = document.querySelector('#add');
    const ul = document.querySelector('#tasks');
    const dateElement = document.querySelector('#date');
    
    // Set the current date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.innerHTML = today.toLocaleDateString(undefined, options);

    function addTask() {
        if (input.value === '') {
            alert('Please enter a task');
        } else {
            let li = document.createElement('li');
            li.innerHTML = input.value;
            ul.appendChild(li);
            input.value = '';

            li.addEventListener('click', function() {
                li.style.textDecoration = li.style.textDecoration === 'line-through' ? '' : 'line-through';
                saveData();
            });

            li.addEventListener('dblclick', function() {
                ul.removeChild(li);
                saveData();
            });

            let span = document.createElement('span');
            span.innerHTML = 'X';
            span.classList.add('delete');
            li.appendChild(span);

            saveData();
        }
    }

    ul.addEventListener('click', function(e) {
        if (e.target.tagName === 'SPAN') {
            e.target.parentNode.remove();
            saveData();
        }
    });

    button.addEventListener('click', addTask);

    function saveData() {
        const tasks = [];
        ul.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.childNodes[0].nodeValue,
                completed: li.style.textDecoration === 'line-through'
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadData() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            let li = document.createElement('li');
            li.innerHTML = task.text;
            if (task.completed) {
                li.style.textDecoration = 'line-through';
            }
            ul.appendChild(li);

            li.addEventListener('click', function() {
                li.style.textDecoration = li.style.textDecoration === 'line-through' ? '' : 'line-through';
                saveData();
            });

            li.addEventListener('dblclick', function() {
                ul.removeChild(li);
                saveData();
            });

            let span = document.createElement('span');
            span.innerHTML = 'X';
            span.classList.add('delete');
            li.appendChild(span);
        });
    }

    loadData();
});

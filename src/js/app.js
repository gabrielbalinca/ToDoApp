const input = document.getElementById('input');
const newTasksList = document.getElementById('newTasks');
const doneTasksList = document.getElementById('doneTasks');
const taskList = [];

class Task {
    constructor(id, text, isDone) {
        this.id = id;
        this.text = text;
        this.isDone = isDone;
    }
}

class ToDo {
    static Init() {
        input.addEventListener('keyup', event => {
            if(event.key == 'Enter' && input.value != '') {
                const task = new Task(Math.floor(Math.random() * 100), input.value, false);
                Render.display(task);
                taskList.push(task);
                input.value = '';
            }
        });
    }
}

class Render {
    static inputTextBoxTask(task, div) {
        const textBox = document.createElement('input');
        textBox.value = task.text;
        div.classList.add('editTask');
        div.appendChild(textBox);
        textBox.focus();
        return div;
    }

    static moveTaskElement () {
        const mainDiv = document.createElement('div');
        const icon = document.createElement('i');
        mainDiv.classList.add('moveTask', 'd-flex', 'flex-direction-row');
        icon.classList.add('fas', 'fa-ellipsis-v');
        mainDiv.appendChild(icon);
        mainDiv.appendChild(icon.cloneNode(true));
        return mainDiv;
    }

    static textTaskElement(task) {
        const mainDiv = document.createElement('div');
        const paragrapthElemenet = document.createElement('p');
        const paragraphText = document.createTextNode(task.text);
        mainDiv.classList.add('descriptionTask', 'd-flex', 'align-vertical-center');
        paragrapthElemenet.appendChild(paragraphText);
        mainDiv.appendChild(paragrapthElemenet);
        return mainDiv;
    }

    static controlTaskElement(task){
        const mainDiv = document.createElement('div');
        const editButton = document.createElement('button');
        const markDoneButton = document.createElement('button');
        const removeButton = document.createElement('button');
        const editIcon = document.createElement('i');
        const markDoneIcon = document.createElement('i');
        const removeIcon = document.createElement('i');
        mainDiv.classList.add('controlsTask', 'd-flex', 'align-vertical-center');
        editButton.classList.add('editButton');
        markDoneButton.classList.add('markDoneTaskButton');
        removeButton.classList.add('removeTaskButton');
        editIcon.classList.add('fas', 'fa-edit');
        markDoneIcon.classList.add('fas', 'fa-check-square');
        editIcon.classList.add('fas', 'fa-edit');
        removeIcon.classList.add('fas', 'fa-minus-circle');
        editButton.appendChild(editIcon);
        mainDiv.appendChild(editButton);
        markDoneButton.appendChild(markDoneIcon);
        mainDiv.appendChild(markDoneButton);
        removeButton.appendChild(removeIcon);
        mainDiv.appendChild(removeButton);

        editButton.addEventListener('click', event => { Controller.Edit(task, event.currentTarget)} );
        markDoneButton.addEventListener('click', event => { Controller.Done(task, event.currentTarget) });
        removeButton.addEventListener('click', event => { Controller.Delete(task, event.currentTarget) });

        return mainDiv;
    }

    static addListItemElement(task){
        const listItem = document.createElement('li');
        listItem.style.opacity = 0;
        listItem.classList.add('taskInner', 'd-flex', 'flex-direction-row');
        listItem.appendChild(this.moveTaskElement());
        listItem.appendChild(this.textTaskElement(task));
        listItem.appendChild(this.controlTaskElement(task));
        this.unfade(listItem);
        return listItem;
    }

    static unfade(element) {
        var op = 0.1;
        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 30);
    }

    static fade(element) {
        var op = 1;
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
            if(op == 0) element.remove();
        }, 10);
    }

    static display (task) {
        if (!task.isDone) {
            newTasksList.appendChild(this.addListItemElement(task));
        } else if (task.isDone) {
            doneTasksList.appendChild(this.addListItemElement(task));
        }
    }
}

class Controller {
    static Edit(task, event) {
        let descriptionTaskDiv = event.parentElement.parentElement.children[1];
        switch (descriptionTaskDiv.firstElementChild.tagName) {
            case 'P':
                descriptionTaskDiv.firstElementChild.remove();
                let editButton = Render.inputTextBoxTask(task, descriptionTaskDiv);
                editButton.firstElementChild.addEventListener('keyup', event => {
                    if(event.key == 'Enter') {
                        this.Edit(task, descriptionTaskDiv.firstElementChild);
                    }
                });
                break;
            case 'INPUT':
                task.text = descriptionTaskDiv.firstElementChild.value;
                descriptionTaskDiv.firstElementChild.remove();
                descriptionTaskDiv.appendChild(Render.textTaskElement(task).firstElementChild);
                break;
        }
    }

    static Done(task, event) {
        const taskElem = event.parentElement.parentElement;
        task.isDone = true;
        Render.fade(taskElem);
        Render.display(task);
    }

    static Delete(task, event){
        const taskElem = event.parentElement.parentElement;
        for(let i = 0; i <= task.length; i++) {
            if(task[i].id === task.id) task.splice(i, 1);
        }
        Render.fade(taskElem);
    }
}

ToDo.Init();
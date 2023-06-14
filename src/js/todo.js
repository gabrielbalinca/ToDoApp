const input = document.getElementById('input');
const newNotesList = document.getElementById('newNotes');
const doneNotesList = document.getElementById('doneNotes');

class Note {
    constructor(){
        input.addEventListener('keyup', event => {
            if(event.key == 'Enter'){
                this.inputValue = input.value;
                if(this.inputValue != ''){
                    input.value = '';
                    this.done = false;
                    newNotesList.appendChild(this.note(this.inputValue));
                }
            }
        });

        document.body.addEventListener('click', event => {
            if(event.target.classList.contains('editButton')) {
                this.editNote(event);
            } else if(event.target.classList.contains('fa-edit')){
                this.editNote(event.target.parentElement);
            } else if(event.target.tagName == 'path' && event.target.parentElement.parentElement.classList.contains('editButton')){
                this.editNote(event.target.parentElement.parentElement);
            }else if(event.target.classList.contains('markDoneButton')) {
                this.markDoneNote(event);
            } else if(event.target.classList.contains('fa-check-square')){
                this.markDoneNote(event.target.parentElement);
            } else if(event.target.tagName == 'path' && event.target.parentElement.parentElement.classList.contains('markDoneButton')){
                this.markDoneNote(event.target.parentElement.parentElement);
            }else if(event.target.classList.contains('removeNoteButton')) {
                this.deleteNote(event);
            } else if(event.target.classList.contains('fa-minus-circle')){
                this.deleteNote(event.target.parentElement);
            } else if(event.target.tagName == 'path' && event.target.parentElement.parentElement.classList.contains('removeNoteButton')){
                this.deleteNote(event.target.parentElement.parentElement);
            }
        });
    }

    note(text){
        var note = document.createElement('div');
        var noteInner = document.createElement('div');
        var moveNote = document.createElement('div');
        var moveIcon = document.createElement('i');
        var descriptionNote = document.createElement('div');
        var textParagraph = document.createElement('p');
        var text = document.createTextNode(text);
        var controlsNote = document.createElement('div');
        var editButton = document.createElement('button');
        var markDoneButton = document.createElement('button');
        var removeButton = document.createElement('button');
        var editButtonIcon = document.createElement('i');
        var markDoneButtonIcon = document.createElement('i');
        var removeButtonIcon = document.createElement('i');
        noteInner.classList.add('noteInner');
        noteInner.classList.add('d-flex');
        noteInner.classList.add('flex-direction-row');
        moveNote.classList.add('moveNote');
        moveNote.classList.add('d-flex');
        moveNote.classList.add('align-vertical-center');
        moveIcon.classList.add('fas');
        moveIcon.classList.add('fa-ellipsis-v');
        descriptionNote.classList.add('descriptionNote');
        descriptionNote.classList.add('d-flex');
        descriptionNote.classList.add('align-vertical-center');
        controlsNote.classList.add('controlsNote');
        controlsNote.classList.add('d-flex');
        controlsNote.classList.add('align-vertical-center');
        editButton.classList.add('editButton');
        markDoneButton.classList.add('markDoneButton');
        removeButton.classList.add('removeNoteButton');
        editButtonIcon.classList.add('fas');
        editButtonIcon.classList.add('fa-edit');
        markDoneButtonIcon.classList.add('fas');
        markDoneButtonIcon.classList.add('fa-check-square');
        removeButtonIcon.classList.add('fas');
        removeButtonIcon.classList.add('fa-minus-circle');
        editButton.appendChild(editButtonIcon);
        markDoneButton.appendChild(markDoneButtonIcon);
        removeButton.appendChild(removeButtonIcon);
        moveNote.appendChild(moveIcon);
        moveNote.appendChild(moveIcon.cloneNode(true));
        noteInner.appendChild(moveNote);
        textParagraph.appendChild(text);
        descriptionNote.appendChild(textParagraph);
        noteInner.appendChild(descriptionNote);
        if(!this.done) {
            controlsNote.appendChild(editButton);
            controlsNote.appendChild(markDoneButton);
        }
        controlsNote.appendChild(removeButton);
        noteInner.appendChild(controlsNote);
        note.style.opacity = 0;
        note.appendChild(noteInner);
        this.unfade(note);
        return note;
    }

    editNote(button){
        var descriptionNoteDiv = button.parentElement.parentElement.children[1];
        var textNote;
        if(descriptionNoteDiv.firstElementChild.tagName == 'P'){
            textNote = descriptionNoteDiv.firstElementChild.innerHTML;
        }else if (descriptionNoteDiv.firstElementChild.tagName == 'INPUT'){
            textNote = descriptionNoteDiv.firstElementChild.value;
        }
        var editTextBox = document.createElement('input');
        descriptionNoteDiv.firstElementChild.remove();
        descriptionNoteDiv.classList.add('editNote');
        descriptionNoteDiv.appendChild(editTextBox);
        editTextBox.value = textNote;
        editTextBox.addEventListener('keyup', event => {
            if(event.key == 'Enter'){
                descriptionNoteDiv.firstElementChild.remove();
                var textParagraph = document.createElement('p');
                var text = document.createTextNode(editTextBox.value);
                textParagraph.appendChild(text);
                descriptionNoteDiv.appendChild(textParagraph);
            }
        });
    }

    markDoneNote(button){
        var note = button.parentElement.parentElement.parentElement;
        var noteText;
        if(note.children[0].children[1].children[0].tagName == 'P') noteText = note.children[0].children[1].children[0].innerHTML;
        else if(note.children[0].children[1].children[0].tagName == 'INPUT') noteText = note.children[0].children[1].children[0].value;
        this.deleteNote(button);
        this.done = true;
        doneNotesList.appendChild(this.note(noteText));
    }

    deleteNote(button) {
        var note = button.parentElement.parentElement.parentElement;
        var op = 1;
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                note.style.display = 'none';
            }
            note.style.opacity = op;
            note.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
            if(op == 0) note.remove();
        }, 10);
    }

    unfade(element) {
        var op = 0.1;
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 30);
    }
}

const note = new Note();
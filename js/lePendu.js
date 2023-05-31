class lePendu {
    constructor({parent_element, list_of_words}) {
        this.parent_element = parent_element;
        this.list_of_words = list_of_words;
        this.errors = 0;
        this.attempts = 0;
        this.letters_found = 0;
        this.random_word;
        this.hidden_letters_array;
        this.init();
    }


init() {
    this.random_word = this.getRandomWord(this.list_of_words);
    console.log(this.random_word);
    
    const word_section_element = document.createElement('section');
    word_section_element.id = "word_to_find";

    /* if (this.random_word.includes('\ ')) {this.letters_found -=1}
    if (this.random_word.includes('\'')) {this.letters_found -=1}
    if (this.random_word.includes('\-')) {this.letters_found -=1}
    else if (this.random_word.includes('é' || 'è' || 'ê')) {this.random_word.replace(/[éèê]/g, 'e')}   
    else if (this.random_word.includes('ù')) {this.random_word.replace(/[ù]/g, 'u')}
    else if (this.random_word.includes('à')) {this.random_word.replace(/[à]/g, 'a')}*/

    word_section_element.innerHTML = `
    <figure>
        <img src="./images/Pendu_Nina_7chances.png" alt="support du jeu, 7 chances"><hr>
        <figcaption> 
            Nombre de lettres à trouver : ${this.random_word.length}<hr> 
            Lettres trouvées :  ${this.letters_found} / ${this.random_word.length}<hr>
            Tentatives : ${this.attempts} / 7 <hr>
            Erreurs : ${this.errors}
        </figcaption>
    </figure>
    `;

    const letters_section_element = document.createElement('section');
    letters_section_element.id = "letters";

    this.generateLettersButtons(letters_section_element);

    this.parent_element.appendChild(word_section_element);
    this.parent_element.appendChild(letters_section_element);

    this.hidden_letters_array = this.displayHiddenWord(this.random_word);
    console.log(this.hidden_letters_array);
}

//methode qui permet de mélanger aléatoirement un tableau
getRandomWord(array) {
    for (let i = array.length -1 ; i> 0 ; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array[0];
}

generateLettersButtons(letters_section_element) {
    const ul_element = document.createElement('ul');
    
    const letters = "abcdefghijklmnopqrstuvwxyz".split('').forEach(letter => {
        
        const li_element = document.createElement('li');
        li_element.textContent = letter;

        li_element.addEventListener('click', (event) => this.checkIfLetterIsInTheWord(event), {once:true});

        ul_element.appendChild(li_element);

    });

    letters_section_element.appendChild(ul_element)
}

displayHiddenWord() {


    const hidden_word = this.random_word.slice().replace(/[a-z]/g, '_');

    const paragraph_element = document.createElement('p')

    paragraph_element.textContent = hidden_word

    document.body.querySelector('section[id="word_to_find"]').appendChild(paragraph_element);

    return hidden_word.split('')
}

checkIfLetterIsInTheWord(event) {

    // à chaque lettre cliquée, incrémenter compteur de tentatives
    this.attempts ++;

    const selected_letter = event.target.textContent;

    if (this.random_word.includes(selected_letter)) {
        event.target.classList.add('good');

        this.random_word.split('').forEach((letter, index) => {
            if (letter === selected_letter) {
                this.random_word.length - this.letters_found
                this.letters_found ++;
                this.hidden_letters_array[index]= selected_letter;
            }
        });

        document.body.querySelector('section[id="word_to_find"] > p').textContent = this.hidden_letters_array.join('');

    }else {
        this.errors ++;
        event.target.classList.add('wrong');
        document.body.querySelector('figure > img').src = `./images/Error${this.errors}.png`;
    }

    document.body.querySelector('figcaption').innerHTML = `Nombre de lettres à trouver : ${this.random_word.length}<hr>Lettres trouvées : ${this.letters_found}<hr>Erreurs : ${this.errors} / 7`

    this.checkIfWinnerOrLoser()
}

checkIfWinnerOrLoser() {
    const word_paragraph = document.body.querySelector('section[id="word_to_find"] > p');
    
    if (this.errors === 7) {
        this.gameOver(word_paragraph);
        word_paragraph.classList.add('loser');
        word_paragraph.textContent = this.random_word;
    }

    if (this.letters_found === this.random_word.length) {
        this.gameOver(word_paragraph);
        word_paragraph.classList.add('winner');
    }
}

gameOver(word_paragraph) {

    word_paragraph.classList.add('gameover');
    document.body.querySelectorAll('li').forEach(letter => letter.className = 'disabled');

    const button_element = document.createElement('button');
    button_element.textContent = "Recommencer!";

    // recharger la page en conservant le cache (false)
    button_element.addEventListener('click', () => window.location.reload(false));

    document.body.querySelector('section [id="letters"]').appendChild(button_element);

}

}
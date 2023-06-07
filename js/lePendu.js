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
    
    const regex_onlyLetter = /[^a-zÀ-ÿ]+/gi
    this.filter_random_word = this.random_word.replace(regex_onlyLetter, '')
    console.log (this.filter_random_word);
    console.log (this.filter_random_word.length);

    const word_section_element = document.createElement('section');
    word_section_element.id = "word_to_find";

    
    word_section_element.innerHTML = `
    <figure>
        <img src="./images/Pendu_Nina_7chances.png" alt="support du jeu, 7 chances"><hr>
        <figcaption> 
            Nombre de lettres à trouver : ${this.filter_random_word.length}<hr> 
            Lettres trouvées :  ${this.letters_found} / ${this.filter_random_word.length}<hr>
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
    
    // la string est éclatée en tableau
    const letters = "abcdefghijklmnopqrstuvwxyz".split('').forEach(letter => {
        
        const li_element = document.createElement('li');
        li_element.textContent = letter;

        // écoute désactivée quand la lettre est cliquée
        li_element.addEventListener('click', () => this.checkIfLetterIsInTheWord(event), {once:true});

        ul_element.appendChild(li_element);

    });

    letters_section_element.appendChild(ul_element)
}

displayHiddenWord() {

    // faire une copie methode slice() du mot aléatoire avec remplacement de ses lettres avec _
    const hidden_word = this.random_word.slice().replace(/[a-zÀ-ÿ]/gi, '_');
    console.log(hidden_word);

    const paragraph_element = document.createElement('p')

    paragraph_element.textContent = hidden_word

    document.body.querySelector('section[id="word_to_find"]').appendChild(paragraph_element);

    // récupérer tableau avec lettres éclatées et cachées
    return hidden_word.split('')
}

checkIfLetterIsInTheWord(event) {

    // à chaque lettre cliquée, incrémenter compteur de tentatives
    this.attempts++;

    const selected_letter = event.target.textContent;

    // enregistrer le mot sans accent avec methode normalize()
    // normalize() : renvoyer la forme normalisée d'une string
    // NFD (normalization from decomposition) : é est décomposé en e+'
    // replace() supprime tout ce qui n'est pas une lettre ou un espace
    const no_accent_word = this.random_word.normalize('NFD').replace(/[^\w\ ]/g, '')
    console.log(no_accent_word);

    if (no_accent_word.includes(selected_letter)) {
        event.target.classList.add('good');


        no_accent_word.split('').forEach((letter, index) => {
            if (letter === selected_letter) {
                this.letters_found++;
                this.hidden_letters_array[index]= selected_letter;
            }
        });

        document.body.querySelector('section[id="word_to_find"] > p').textContent = this.hidden_letters_array.join('');
    }
    
    else {
        this.errors ++;
        event.target.classList.add('wrong');
        document.body.querySelector('figure > img').src = `./images/Error${this.errors}.png`;
    }

    document.body.querySelector('figcaption').innerHTML = `
        Nombre de lettres à trouver : ${this.filter_random_word.length}<hr>
        Lettres trouvées : ${this.letters_found}<hr>
        Tentatives : ${this.attempts} <hr>
        Erreurs : ${this.errors} / 7`

    this.checkIfWinnerOrLoser()
}

checkIfWinnerOrLoser() {
    const word_paragraph = document.body.querySelector('section[id="word_to_find"] > p');
    
    if (this.errors === 7) {
        word_paragraph.classList.add("loser");
        this.gameOver(word_paragraph);
        word_paragraph.textContent = this.random_word;
    }

    if (this.letters_found === this.filter_random_word.length) {
        word_paragraph.classList.add("winner");
        this.gameOver(word_paragraph);
        word_paragraph.textContent = this.random_word;
    }
}

gameOver(word_paragraph) {

    word_paragraph.classList.add('gameover');

    // retirer les classes good or wrong associées aux lettres
    document.body.querySelectorAll('li').forEach(letter => letter.className = 'disabled');

    const button_element = document.createElement('button');
    button_element.textContent = "Recommencer!";

    // recharger la page en conservant le cache (false)
    button_element.addEventListener('click', () => window.location.reload(false));

    document.body.querySelector('section [id="letters"]').appendChild(button_element);

}

}
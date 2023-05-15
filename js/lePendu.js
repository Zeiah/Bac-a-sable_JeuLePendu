class lePendu {
    constructor({parent_element, list_of_words}) {
        this.parent_element = parent_element;
        this.list_of_words = list_of_words;
        this.errors = 0;
        this.attemps = 0;
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
    // word_section_element.className=
    
    word_section_element.innerHTML = `
    <figure>
        <img src="./images/gallows.gif" alt="support de pendaison">
        <figcaption> 
            Nombre de lettres à trouver: ${this.random_word.length}<hr> 
            Lettres trouvées :  ${this.letters_found}<hr>
            Tentatives : ${this.errors} / 7
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

        li_element.addEventListener('click', () => this.checkIfLetterIsInTheWord(event), {once:true});

        ul_element.appendChild(li_element);

    });

    letters_section_element.appendChild(ul_element)
}

}
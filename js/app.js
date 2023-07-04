const listes = [
    {
        id: 1,
        name: "Liste 1",
        words_to_find: [
            "afin\ de",
            "ainsi",
            "alors",
            "après",
            "assez",
            "à\ travers",
            "au\-dessus",
            "au\-dessous",
            "aujourd\'hui",
            "auprès" 
        ]
    },
    {
        id: 2,
        name: "Liste 2",
        words_to_find: [
            "aussi",
            "aussitôt",
            "autant",
            "autour",
            "autrefois",
            "autrement",
            "avant",
            "avec",
            "beaucoup",
            "bien" 
    ]
    },
    {
        id: 3,
        name: "Liste 3",
        words_to_find: [
            "bientôt",
            "car",
            "ceci",
            "cela",
            "cependant",
            "chez",
            "comme",
            "comment",
            "dans",
            "dedans" 
        ]   
    },
    {
        id: 4,
        name: "Liste 4",
        words_to_find: [
            "dehors",
            "déjà",
            "demain",
            "depuis",
            "dessous",
            "dessus",
            "devant",
            "donc",
            "dont",
            "durant" 
        ]   
    },
    {
        id: 5,
        name: "Liste 5",
        words_to_find: [
            "encore",
            "enfin",
            "ensuite",
            "entre",
            "envers",
            "environ",
            "exprès",
            "fois",
            "guère",
            "hélas" 
        ]   
    },
    {
        id: 6,
        name: "Liste 6",
        words_to_find: [
            "hier",
            "ici",
            "jamais",
            "là",
            "là-bas",
            "le long",
            "loin",
            "longtemps",
            "lors de",
            "lorsque",
            "maintenant" 
        ]   
    },
    {
        id: 7,
        name: "Liste 7",
        words_to_find: [
            "mais",
            "malgré",
            "mieux",
            "moindre",
            "moins",
            "non",
            "oui",
            "par",
            "parce que",
            "par dessous",
            "par dessus" 
        ]   
    },
    {
        id: 8,
        name: "Liste 8",
        words_to_find: [
            "parfois",
            "parmi",
            "pas",
            "pendant",
            "personne",
            "peu",
            "plus",
            "plusieurs",
            "plutôt",
            "pour" 
        ]   
    },
    {
        id: 9,
        name: "Liste 9",
        words_to_find: [
            "pourquoi",
            "pourtant",
            "près",
            "presque",
            "puis",
            "quand",
            "quelquefois",
            "quoi",
            "quoique",
            "sans",
            "sauf" 
        ]   
    },
    {
        id: 10,
        name: "Liste 10",
        words_to_find: [
            "selon",
            "seulement",
            "sinon",
            "soudain",
            "sous",
            "souvent",
            "sur",
            "surtout",
            "tant",
            "tantôt" 
        ]   
    },
    {
        id: 11,
        name: "Liste 11",
        words_to_find: [
            "tard",
            "tôt",
            "toujours",
            "toutefois",
            "très",
            "trop",
            "vers",
            "voici",
            "voilà",
            "vraiment" 
        ]   
    }
]

const rules = document.querySelector("h3");
rules.innerHTML = `Choisis une liste de mots <br> et découvre le mot caché`

const figcaption = document.querySelector('figcaption');
figcaption.innerHTML = `Tu as 7 chance(s)! <br>`

const text__hidden_word = document.querySelector('.text__hidden_word');
text__hidden_word.innerHTML = `Mot caché`

function toChooseMyList() {
    const btnList = document.querySelectorAll('.btnList')
    console.log("btnlist", btnList);
    for (let i = 0; i < btnList.length; i++){
        btnList[i].addEventListener("click", () => {
            const btnListId = parseInt(btnList[i].id)
            console.log("btnListId", btnListId)
            const myList = listes.find(liste => liste.id === btnListId)
            console.log(myList);

            btnList[i].setAttribute("class", "selected")
            
            const myListNumber = document.body.querySelector("h2");
            myListNumber.innerHTML = ` Tu as choisi la <span>${myList.name}</span>`
            
            const rules = document.querySelector("h3");
            rules.innerHTML = ``

            new lePendu ({
                parent_element: document.body.querySelector('main'),
                list_of_words: myList.words_to_find,
            });

            disabledBtn()
        }   
    )}
}

function disabledBtn() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.setAttribute("disabled", "")
        })         
}

toChooseMyList()





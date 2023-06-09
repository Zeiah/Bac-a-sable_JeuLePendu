const words_to_find = [
    'afin\ de',
    'ainsi',
    'alors',
    'après',
    'assez',
    'à\ travers',
    'au\-dessus',
    'au\-dessous',
    'aujourd\'hui',
    'auprès'
]

new lePendu ({
    parent_element: document.body.querySelector('main'),
    list_of_words: words_to_find,
})
import Book from "../models/Book";

var bookDB = {}
if(localStorage.getItem('bookDB')) {
    bookDB = JSON.parse(localStorage.getItem('bookDB'));
} else {
    bookDB = {
        1: {
            name: "The Night Circus",
            description: "A mysterious, magical competition unfolds between two young illusionists in a circus that only appears at night. Their rivalry is intense, but so is their love—complicating the fate of the circus itself.",
            author: "Erin Morgenstern",
        },
        2: {
            name: "Where the Crawdads Sing",
            description: "A coming-of-age mystery set in the marshlands of North Carolina, following a young girl abandoned by her family and suspected of murder. The novel blends nature writing, romance, and suspense.",
            author: "Delia Owens",
        },
        3: {
            name: "Project Hail Mary",
            description: "A lone astronaut wakes up in deep space with no memory of his mission—only to realize he is humanity’s last hope for survival. A thrilling mix of science, humor, and adventure.",
            author: "Andy Weir",
        },
        4: {
            name: "Sapiens: A Brief History of Humankind",
            description: "A fascinating look at how Homo sapiens evolved, developed civilizations, and shaped the modern world.",
            author: "Yuval Noah Harari",
        },
        5: {
            name: "Atomic Habits",
            description: "A guide to building good habits and breaking bad ones using small, actionable changes that compound over time.",
            author: "James Clear",
        },
        6: {
            name: "The Immortal Life of Henrietta Lacks",
            description: "The true story of Henrietta Lacks, whose cancer cells were taken without her knowledge and became crucial for medical breakthroughs—raising questions about ethics, race, and science.",
            author: "Rebecca Skloot",
        },
        7: {
            name: "The Name of the Wind",
            description: "The story of Kvothe, a legendary hero and magician, as he recounts his life from childhood to the beginnings of his fame. A beautifully written fantasy epic.",
            author: "Patrick Rothfuss",
        },
        8: {
            name: "The Three-Body Problem",
            description: "A mind-bending Chinese sci-fi novel about first contact with an alien civilization and the consequences for humanity.",
            author: "Liu Cixin",
        },
    }
    localStorage.setItem('bookDB', JSON.stringify(bookDB));
}

/**
 * 
 * @param {Book} book book class object
 */
export function addBook(book){
    const {id, name, description, author} = book;
    bookDB[id] = {
        name: name,
        description: description,
        author: author,
    }
    localStorage.setItem('bookDB', JSON.stringify(bookDB));
}

export function getBook(id){
    const {name, description, author} = bookDB[id];
    return new Book(id, name, description, author);
}

/**
 * 
 * @returns list of books
 */
export function getAllBooks(){
    const books = [];
    for (const id in bookDB){
        const {name, description, author} = bookDB[id];
        books.push(new Book(id, name, description, author))
    }

    return books;
}
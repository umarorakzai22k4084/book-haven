var favoriteDB = {}
if(localStorage.getItem('favoriteDB')) {
    favoriteDB = JSON.parse(localStorage.getItem('favoriteDB'));
} else {
    favoriteDB = {
        'user1': [3],
    }
    localStorage.setItem('favoriteDB', JSON.stringify(favoriteDB));
}

export function addFavorite(favorite){
    const {username, bookId} = favorite;
    
    if(favoriteDB[username]){
        favoriteDB[username].push(Number(bookId));
    } else {
        favoriteDB[username] = [Number(bookId)];
    }
    localStorage.setItem('favoriteDB', JSON.stringify(favoriteDB));
}

/**
 * 
 * @param {Favorite} favorite favorite class object
 */
export function removeFavorite(favorite){
    const {username, bookId} = favorite;
    if(!favoriteDB[username]) return;

    var currentFav = favoriteDB[username];
    currentFav = currentFav.filter((favBookId) => favBookId !== Number(bookId));
    favoriteDB[username] = currentFav;
    localStorage.setItem('favoriteDB', JSON.stringify(favoriteDB));
}

export function getIsFavorite(username, bookId){
    if(favoriteDB[username]){
        const userFav = favoriteDB[username];
        
        if(userFav.filter((favBookId) => Number(favBookId) === Number(bookId)).length !== 0){
            return true;
        }
    }

    return false;
}
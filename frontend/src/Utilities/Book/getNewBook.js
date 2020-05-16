import getNewArtist from 'Utilities/Author/getNewAuthor';

function getNewBook(album, payload) {
  const {
    searchForNewAlbum = false
  } = payload;

  getNewArtist(album.author, payload);

  album.addOptions = {
    searchForNewAlbum
  };
  album.monitored = true;

  return album;
}

export default getNewBook;

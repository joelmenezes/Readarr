
function getNewAuthor(author, payload) {
  const {
    rootFolderPath,
    monitor,
    qualityProfileId,
    metadataProfileId,
    artistType,
    albumFolder,
    tags,
    searchForMissingAlbums = false
  } = payload;

  const addOptions = {
    monitor,
    searchForMissingAlbums
  };

  author.addOptions = addOptions;
  author.monitored = true;
  author.qualityProfileId = qualityProfileId;
  author.metadataProfileId = metadataProfileId;
  author.rootFolderPath = rootFolderPath;
  author.artistType = artistType;
  author.albumFolder = albumFolder;
  author.tags = tags;

  return author;
}

export default getNewAuthor;

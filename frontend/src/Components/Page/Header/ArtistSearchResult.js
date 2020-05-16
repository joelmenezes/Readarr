import PropTypes from 'prop-types';
import React from 'react';
import { kinds } from 'Helpers/Props';
import Label from 'Components/Label';
import ArtistPoster from 'Author/AuthorPoster';
import styles from './ArtistSearchResult.css';

function ArtistSearchResult(props) {
  const {
    match,
    authorName,
    images,
    tags
  } = props;

  let tag = null;

  if (match.key === 'tags.label') {
    tag = tags[match.arrayIndex];
  }

  return (
    <div className={styles.result}>
      <ArtistPoster
        className={styles.poster}
        images={images}
        size={250}
        lazy={false}
        overflow={true}
      />

      <div className={styles.titles}>
        <div className={styles.title}>
          {authorName}
        </div>

        {
          tag ?
            <div className={styles.tagContainer}>
              <Label
                key={tag.id}
                kind={kinds.INFO}
              >
                {tag.label}
              </Label>
            </div> :
            null
        }
      </div>
    </div>
  );
}

ArtistSearchResult.propTypes = {
  authorName: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired
};

export default ArtistSearchResult;

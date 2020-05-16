import React from 'react';
import ArtistHistoryContentConnector from 'Author/History/AuthorHistoryContentConnector';
import ArtistHistoryTableContent from 'Author/History/AuthorHistoryTableContent';

function AuthorHistoryTable(props) {
  const {
    ...otherProps
  } = props;

  return (
    <ArtistHistoryContentConnector
      component={ArtistHistoryTableContent}
      {...otherProps}
    />
  );
}

AuthorHistoryTable.propTypes = {
};

export default AuthorHistoryTable;

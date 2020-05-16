import { createSelector } from 'reselect';
import createAuthorSelector from './createAuthorSelector';

function createArtistQualityProfileSelector() {
  return createSelector(
    (state) => state.settings.qualityProfiles.items,
    createAuthorSelector(),
    (qualityProfiles, author = {}) => {
      return qualityProfiles.find((profile) => {
        return profile.id === author.qualityProfileId;
      });
    }
  );
}

export default createArtistQualityProfileSelector;

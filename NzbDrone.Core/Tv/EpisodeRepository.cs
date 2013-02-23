using System;
using System.Collections.Generic;
using System.Linq;
using NzbDrone.Core.Datastore;

namespace NzbDrone.Core.Tv
{
    public interface IEpisodeRepository : IBasicRepository<Episode>
    {
        Episode Get(int seriesId, int season, int episodeNumber);
        Episode Get(int seriesId, DateTime date);
        IList<Episode> GetEpisodes(int seriesId);
        IList<Episode> GetEpisodes(int seriesId, int seasonNumber);
        IList<Episode> GetEpisodeByFileId(int fileId);
        IList<Episode> EpisodesWithoutFiles(bool includeSpecials);
        Episode GetEpisodeBySceneNumbering(int seriesId, int seasonNumber, int episodeNumber);
        IList<Episode> EpisodesWithFiles();
        List<Episode> EpisodesBetweenDates(DateTime startDate, DateTime endDate);
    }

    public class EpisodeRepository : BasicRepository<Episode>, IEpisodeRepository
    {
        public EpisodeRepository(IObjectDatabase objectDatabase)
            : base(objectDatabase)
        {
        }

        public Episode Get(int seriesId, int season, int episodeNumber)
        {
            return Queryable.Single(s => s.SeriesId == seriesId && s.SeasonNumber == season && s.EpisodeNumber == episodeNumber);
        }

        public Episode Get(int seriesId, DateTime date)
        {
            return Queryable.Single(s => s.SeriesId == seriesId && s.AirDate.HasValue && s.AirDate.Value.Date == date.Date);
        }

        public IList<Episode> GetEpisodes(int seriesId)
        {
            return Queryable.Where(s => s.SeriesId == seriesId).ToList();
        }

        public IList<Episode> GetEpisodes(int seriesId, int seasonNumber)
        {
            return Queryable.Where(s => s.SeriesId == seriesId && s.SeasonNumber == seasonNumber).ToList();
        }

        public IList<Episode> GetEpisodeByFileId(int fileId)
        {
            return Queryable.Where(s => s.EpisodeFile != null && s.EpisodeFile.EpisodeFileId == fileId).ToList();
        }

        public IList<Episode> EpisodesWithoutFiles(bool includeSpecials)
        {
            var noFiles = Queryable.Where(s => s.EpisodeFile == null);

            if (!includeSpecials)
            {
                noFiles = noFiles.Where(c => c.SeasonNumber != 0);
            }

            return noFiles.ToList();
        }

        public Episode GetEpisodeBySceneNumbering(int seriesId, int seasonNumber, int episodeNumber)
        {
            return Queryable.Single(s => s.SeriesId == seriesId && s.SeasonNumber == seasonNumber && s.SceneEpisodeNumber == episodeNumber);
        }

        public IList<Episode> EpisodesWithFiles()
        {
            return Queryable.Where(s => s.EpisodeFile != null).ToList();
        }

        public List<Episode> EpisodesBetweenDates(DateTime startDate, DateTime endDate)
        {
            return Queryable.Where(s => s.AirDate >= startDate && s.AirDate <= endDate).ToList();
        }
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
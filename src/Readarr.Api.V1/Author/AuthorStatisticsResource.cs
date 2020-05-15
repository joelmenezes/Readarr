using NzbDrone.Core.AuthorStats;

namespace Readarr.Api.V1.Author
{
    public class AuthorStatisticsResource
    {
        public int BookCount { get; set; }
        public int BookFileCount { get; set; }
        public int TrackCount { get; set; }
        public int TotalTrackCount { get; set; }
        public long SizeOnDisk { get; set; }

        public decimal PercentOfTracks
        {
            get
            {
                if (TrackCount == 0)
                {
                    return 0;
                }

                return BookFileCount / (decimal)TrackCount * 100;
            }
        }
    }

    public static class ArtistStatisticsResourceMapper
    {
        public static AuthorStatisticsResource ToResource(this AuthorStatistics model)
        {
            if (model == null)
            {
                return null;
            }

            return new AuthorStatisticsResource
            {
                BookCount = model.BookCount,
                BookFileCount = model.BookFileCount,
                SizeOnDisk = model.SizeOnDisk
            };
        }
    }
}

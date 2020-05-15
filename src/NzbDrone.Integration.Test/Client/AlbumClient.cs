using System.Collections.Generic;
using Readarr.Api.V1.Books;
using RestSharp;

namespace NzbDrone.Integration.Test.Client
{
    public class AlbumClient : ClientBase<BookResource>
    {
        public AlbumClient(IRestClient restClient, string apiKey)
            : base(restClient, apiKey, "album")
        {
        }

        public List<BookResource> GetAlbumsInArtist(int authorId)
        {
            var request = BuildRequest("?authorId=" + authorId.ToString());
            return Get<List<BookResource>>(request);
        }
    }
}

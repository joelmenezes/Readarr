using System.Collections.Generic;
using System.Net;
using Readarr.Api.V1.Author;
using RestSharp;

namespace NzbDrone.Integration.Test.Client
{
    public class ArtistClient : ClientBase<AuthorResource>
    {
        public ArtistClient(IRestClient restClient, string apiKey)
            : base(restClient, apiKey)
        {
        }

        public List<AuthorResource> Lookup(string term)
        {
            var request = BuildRequest("lookup");
            request.AddQueryParameter("term", term);
            return Get<List<AuthorResource>>(request);
        }

        public List<AuthorResource> Editor(AuthorEditorResource artist)
        {
            var request = BuildRequest("editor");
            request.AddJsonBody(artist);
            return Put<List<AuthorResource>>(request);
        }

        public AuthorResource Get(string slug, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            var request = BuildRequest(slug);
            return Get<AuthorResource>(request, statusCode);
        }
    }

    public class SystemInfoClient : ClientBase<AuthorResource>
    {
        public SystemInfoClient(IRestClient restClient, string apiKey)
            : base(restClient, apiKey)
        {
        }
    }
}

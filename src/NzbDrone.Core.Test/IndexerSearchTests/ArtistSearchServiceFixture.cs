using System.Collections.Generic;
using System.Linq;
using Moq;
using NUnit.Framework;
using NzbDrone.Core.Books;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Download;
using NzbDrone.Core.IndexerSearch;
using NzbDrone.Core.Messaging.Commands;
using NzbDrone.Core.Test.Framework;

namespace NzbDrone.Core.Test.IndexerSearchTests
{
    [TestFixture]
    public class ArtistSearchServiceFixture : CoreTest<AuthorSearchService>
    {
        private Author _artist;

        [SetUp]
        public void Setup()
        {
            _artist = new Author();

            Mocker.GetMock<IAuthorService>()
                .Setup(s => s.GetAuthor(It.IsAny<int>()))
                .Returns(_artist);

            Mocker.GetMock<ISearchForNzb>()
                .Setup(s => s.ArtistSearch(_artist.Id, false, true, false))
                .Returns(new List<DownloadDecision>());

            Mocker.GetMock<IProcessDownloadDecisions>()
                .Setup(s => s.ProcessDecisions(It.IsAny<List<DownloadDecision>>()))
                .Returns(new ProcessedDecisions(new List<DownloadDecision>(), new List<DownloadDecision>(), new List<DownloadDecision>()));
        }

        [Test]
        public void should_only_include_monitored_albums()
        {
            _artist.Books = new List<Book>
            {
                new Book { Monitored = false },
                new Book { Monitored = true }
            };

            Subject.Execute(new AuthorSearchCommand { AuthorId = _artist.Id, Trigger = CommandTrigger.Manual });

            Mocker.GetMock<ISearchForNzb>()
                .Verify(v => v.ArtistSearch(_artist.Id, false, true, false),
                    Times.Exactly(_artist.Books.Value.Count(s => s.Monitored)));
        }
    }
}

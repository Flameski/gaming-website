import { useRef, useState, useEffect } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Gamebox from "./components/Gamebox";
import GameInfoBox from "./components/GameInfoBox";
import data from "./data";
import { Game } from "./interfaces";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchGames, setSearchGames] = useState([""]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const inputBox = useRef<HTMLInputElement>(null);
  const banner = useRef<HTMLDivElement>(null);
  const [gameDetails, setGameDetails] = useState<Game>();
  const [showGameInfo, setShowGameInfo] = useState(false);
  const [randomGamesState, setRandomGamesState] = useState<any[]>([]);

  const searchGame = async (id: number) => {
    let response = await getGameInfo(id);
    let title: string = response._embedded.product.title;
    let img = response._embedded.product._links.image.href;
    img = img.replace("{formatter}", "800");
    let description = response.description;
    let gameTags = response._embedded.tags;
    let tags: string[] = [];
    gameTags.forEach((tag: { name: string }) => {
      tags.push(tag.name);
    });
    let gameScreenshots = response._embedded.screenshots;
    let screenshots: string[] = [];
    gameScreenshots.forEach((sc: any) => {
      screenshots.push(sc._links.self.href);
    });
    setGameDetails({
      title,
      img,
      description,
      tags,
      screenshots,
    });
    setShowGameInfo(true);
    banner.current!.style.height = "0";
  };

  const parseTextSearch = (text: string) => {
    data.forEach((game) => {
      if (game.gameName === text) {
        searchGame(game.id);
      }
    });
  };

  const showListOfGames = (text: string) => {
    // shows the dropdown of game suggestions for the search box
    setSearchText(text);
    setSearchResultsVisible(text.length > 2);
    if (text.length > 2) {
      let arrayOfGameNames: string[] = [];
      data.forEach((el) => {
        if (el.gameName.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
          arrayOfGameNames.push(el.gameName);
        }
      });
      setSearchGames(arrayOfGameNames);
      setSearchResultsVisible(arrayOfGameNames.length > 0);
    }
  };

  useEffect(() => {
    // gets 9 random games to fill the home screen
    let arrayOfRandomGameIDs: number[] = [];
    while (arrayOfRandomGameIDs.length < 9) {
      let randomGameID = Math.ceil(Math.random() * data.length);
      if (data[randomGameID].id in arrayOfRandomGameIDs) return;
      arrayOfRandomGameIDs.push(data[randomGameID].id);
    }

    for (const gameId of arrayOfRandomGameIDs) {
      (async () => {
        let randomGame = await getGameInfo(gameId);
        setRandomGamesState((randomGamesState) => [
          ...randomGamesState,
          randomGame,
        ]);
      })();
    }
  }, []);

  async function getGameInfo(gameId: number) {
    const gameInfo = await fetch(`https://api.gog.com/v2/games/${gameId}`);
    const gameInfoAsJson = await gameInfo.json();
    return gameInfoAsJson;
  }

  return (
    <>
      {/* {isLoading && <div className="loading"><div className="loader"></div></div>} */}
      {/* unused loading screen */}
      <section className="top-nav">
        <div className="top-nav-items">
          <ul>
            <li>Help</li>
            <li>Contact Us</li>
            <li>How To Use</li>
          </ul>
        </div>
      </section>
      <header>
        <div className="header">
          <div className="logo">
            <span>G</span>ames <span>C</span>enter
          </div>
          <nav>
            <ul className="main-nav">
              <li id="home">Home</li>
              <li id="games">Games</li>
              <li id="reviews">Reviews</li>
              <li id="news">News</li>
              <li id="blog">Blog</li>
              <li id="contact">Contact</li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="banner" ref={banner}>
        <Banner />
      </section>
      <main>
        <section className="searchfield">
          <input
            type="search"
            name="search"
            id="search-input"
            placeholder="Search for a game"
            value={searchText}
            ref={inputBox}
            onChange={(e) => {
              showListOfGames(e.target.value);
            }}
          />
          <button
            id="search-btn"
            onClick={() => {
              parseTextSearch(inputBox.current!.value);
            }}
          >
            Search
          </button>
          {searchResultsVisible && (
            <div className="search-results">
              {searchGames.slice(0, 5).map((el, index) => {
                return (
                  <div key={index}>
                    <p
                      className="single-search-result"
                      onClick={() => {
                        setSearchText(el);
                        setSearchResultsVisible(false);
                      }}
                    >
                      {el}
                    </p>
                    {index === searchGames.length - 1 || index === 4 ? null : (
                      <hr />
                    )}
                    {/* the above check removes the hr for the last element */}
                  </div>
                );
              })}
            </div>
          )}
        </section>
        {showGameInfo ? (
          <GameInfoBox {...gameDetails!} />
        ) : (
          <section className="game-grid">
            {randomGamesState.map((el, index) => {
              return <Gamebox {...el} onClick={searchGame} key={index} />;
            })}
          </section>
        )}
      </main>
      <footer>
        Design by <a href="http://w3layouts.com/">W3layouts</a>
      </footer>
    </>
  );
}

export default App;

import { useRef, useState, useEffect, useCallback } from 'react';
import './App.css';
import Banner from './components/Banner';
import Gamebox from './components/Gamebox';
import data from './data'

function App() {
  const [searchText, setSearchText] = useState('');
  const [searchGames, setSearchGames] = useState(['']);
  const [searchResultsVisible,setSearchResultsVisible] = useState(false);
  const inputBox = useRef<HTMLInputElement>(null);

  const [randomGamesState, setRandomGamesState] = useState<any[]>([]);
  const searchGame = (text:string) => {
    // TODO: best to rework this to use IDs instead of names
    if(text) {
      data.forEach(async (element) => {
        let elementA = element.gameName.replace("’",";").toLowerCase();
        let elementB = text.replace("’",";").toLowerCase();
        if(elementA === elementB) {
          console.log(await getGameInfo(element.id));
        }
      })
    }
  }
  const showListOfGames = (text:string) => {
    setSearchText(text);
    setSearchResultsVisible(text.length > 2)
    if(text.length > 2) {
      let arrayOfGameNames:string[] = [];
      data.forEach((el) => {
        if(el.gameName.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
          arrayOfGameNames.push(el.gameName);
        }
      })
      setSearchGames(arrayOfGameNames);
      setSearchResultsVisible(arrayOfGameNames.length > 0);
    }
  }

  useEffect(()=>{
    let arrayOfRandomGameIDs:number[] = [];
    while(arrayOfRandomGameIDs.length < 9) {
      let randomGameID = Math.ceil((Math.random() * data.length))
      if(data[randomGameID].id in arrayOfRandomGameIDs) return;
      arrayOfRandomGameIDs.push(data[randomGameID].id) 
    };

    console.log(arrayOfRandomGameIDs);
    
    for(const gameId of arrayOfRandomGameIDs) {
      (async ()=> {
        let randomGame = await getGameInfo(gameId);
        setRandomGamesState(randomGamesState => [...randomGamesState, randomGame])
      })()     
    }
    
  },[])

  

  async function getGameInfo(gameId: number) {
    const gameInfo = await fetch(`https://api.gog.com/v2/games/${gameId}`);
    const gameInfoAsJson = await gameInfo.json()
    return gameInfoAsJson;
  }

  return (
    <>
    {/* {isLoading && <div className="loading"><div className="loader"></div></div>} */}
      <section className='top-nav'>
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
          <ul className='main-nav'>
            <li id='home'>Home</li>
            <li id='games'>Games</li>
            <li id='reviews'>Reviews</li>
            <li id='news'>News</li>
            <li id='blog'>Blog</li>
            <li id='contact'>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
    <section className="banner">
      <Banner />
    </section>
    <main>
      <section className='searchfield'>
          <input type="search" name="search" id="search-input" placeholder='Search for a game' value={searchText} ref={inputBox} onChange={(e) => {showListOfGames(e.target.value)}}/>
          <button id='search-btn' onClick={() => {searchGame(inputBox.current?.value as string)}}>Search</button>
          { searchResultsVisible &&
          <div className="search-results">
            {searchGames.slice(0,5).map((el, index) => {
              return (<>
                <p className='single-search-result' key={index} onClick={()=> {setSearchText(el); setSearchResultsVisible(false)}}>{el}</p>
                {index === searchGames.length - 1 || index === 4 ? null:<hr />}
                {/* the above check removes the hr for the last element */}
                </>
                )
              })}
          </div>}
      </section>
      <section className="game-grid">
        {randomGamesState.map((el, index)=> {          
          return (
            <Gamebox {...el} onClick={searchGame} key={index} />
          )
        })}
      </section>
    </main>
    <footer>Design by <a href="http://w3layouts.com/">W3layouts</a></footer>
    </>
  );
}

export default App;
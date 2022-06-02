import { useRef, useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import data from './data'

function App() {
  const [searchGames, setSearchGames] = useState(['']);
  const inputBox = useRef<HTMLInputElement>(null);
  const searchGame = (text:string) => {
    if(text) {
      data.forEach((element) => {
        if(element.gameName.toLowerCase() === text.toLowerCase()) {
          getGameInfo(element.id);
        }
      })
    }
  }
  const advancedSearchGame = (text:string) => {
    if(text.length > 2) {
      let arrayOfGameNames:string[] = [];
      data.forEach((el) => {
        if(el.gameName.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
          arrayOfGameNames.push(el.gameName);
        }
      })
      setSearchGames(arrayOfGameNames);
    }
  }

  async function getGameInfo(gameId: number) {
    const gameInfo = await fetch(`https://api.gog.com/v2/games/${gameId}`);
    const gameInfoAsJson = await gameInfo.json()
    const title = gameInfoAsJson._embedded.product.title;
    console.log(title);
  }

  return (
    <>
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
      <input type="search" name="search" id="search" onChange={(e) => {advancedSearchGame(e.target.value)}} ref={inputBox}/>
      <button onClick={() => {searchGame(inputBox.current?.value as string)}}>Search</button>
      {searchGames.slice(0,5).map((el, index) => {
        return (
          <p key={index}>{el}</p>
        )
      })}
      

    </main>
    <footer>Design by <a href="http://w3layouts.com/">W3layouts</a></footer>
    </>
  );
}

export default App;

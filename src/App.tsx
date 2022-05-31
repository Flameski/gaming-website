import React from 'react';
import logo from './logo.svg';
import './App.css';

async function getSteamGameInfo() {
  // example from the Steam API
  // this produces a CORS error...
  // const gameInfo = await fetch('https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=1466860&count=3&maxlength=300&format=json');
  // const gameInfoAsJson = await gameInfo.json()
  // const title = gameInfoAsJson.appnews.newsitems[0].title;
  // console.log(title);
}

async function getGameInfo() {
  // example from the GOG API
  const gameInfo = await fetch('https://api.gog.com/v2/games/1207666353');
  const gameInfoAsJson = await gameInfo.json()
  const title = gameInfoAsJson._embedded.product.title;
  console.log(title);
}

function App() {
  getSteamGameInfo();
  getGameInfo();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This will eventually be the Steam/GOG API site.
        </p>
      </header>
    </div>
  );
}

export default App;

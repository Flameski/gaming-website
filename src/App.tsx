import './App.css';
import Banner from './components/Banner';

// async function getGameInfo() {
//   // example from the GOG API
//   const gameInfo = await fetch('https://api.gog.com/v2/games/1207666353');
//   const gameInfoAsJson = await gameInfo.json()
//   const title = gameInfoAsJson._embedded.product.title;
//   console.log(title);
// }

function App() {
  // getGameInfo();

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

    </main>
    <footer>Design by <a href="http://w3layouts.com/">W3layouts</a></footer>
    </>
  );
}

export default App;

import { Game } from '../interfaces'


function GameInfoBox(info: Game) {
  return (
    <section className='game-info-box'>
        {/* TODO: Maybe add a close btn? */}
        <h2>{info.title}</h2>
        <img src={info.img} alt={info.title} />
        <p dangerouslySetInnerHTML={{__html: info.description}}></p>
        <div className='screenshots'>
            {info.screenshots.map((sc, index) => {
                return (
                    <img key={index} src={sc.replace('{formatter}', 'product_card_screenshot_112')} alt={info.title + 'Screenshot ' + index} />
                )
            })}
            {/* TODO: you should be able to click on the screenshots and see a gallery */}
        </div>
        <div className='tags'>
            {info.tags.map((tag, index) => {
                return (
                   <span key={index}>{tag}</span>
                )
            })}
               {/* TODO: style the tags a bit */}
        </div>
    </section>
  )
}

export default GameInfoBox
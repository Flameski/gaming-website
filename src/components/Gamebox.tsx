function Gamebox(props: any) {
    let imageHref = props._embedded.product._links.image.href;
    imageHref = imageHref.slice(0, -15) + '800.png'
    
  return (
    <div className="gamebox" onClick={()=>{props.onClick(props._embedded.product.title)}}>
        <img src={imageHref} alt="Game" />
    </div>
  )
}

export default Gamebox
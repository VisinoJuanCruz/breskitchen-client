
import './cakecard.css'



export default function VerticalCard({item}){


    return (
            <div className="item-card h-100 col-3">
                <h5 className="card-title">{item.nombre}</h5>
                <img src={item.img} className="card-img-top img-fluid" alt="..."/>
                <div className="card-body">
                    
                    <p className="card-text"><strong>{item.precio}</strong></p>
                </div>
      
    </div>
 
    )
}
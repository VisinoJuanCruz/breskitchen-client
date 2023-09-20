

export default function HorizontalCard({item}){

    
    return (
        <div className="horizontal-card mb-3 col-5" >
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={item.img} className="img-fluid rounded-start" style={{ minWidth: '250px', minHeight: '300px', objectFit: 'cover' }} alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.nombre}</h5>
                        <p className="card-text">{item.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
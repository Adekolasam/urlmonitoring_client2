import { Link} from "react-router-dom"


const Error01 = (props) => {
    return(
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">{props.statuscode}</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> {props.shortmessage}</p>
                <p className="lead">
                    {props.details}
                  </p>
                
                {props.redirect ? 
                    <Link to={props.redirectlink} className="btn btn-primary">{props.redirecttitle}</Link>
                    : null
                }
                
            </div>
        </div>
    )
}

export default Error01;



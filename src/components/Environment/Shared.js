import {ChevronsLeft} from 'react-feather';
import { Link } from "react-router-dom";

export const EnvironmentForm = (props) => {
    let {formState} = props;
    return(
        <div className="container-fluid">
            <div className="row">   
                <div className="col-md-6">
                    <form id="eForm" action='#0'>
                        <div className="form-group">
                            <label className="control-label">Name</label>
                            <input name="Name" type="text" value={formState.Name} className="form-control" 
                                onChange={props.formHandler} placeholder="Enter environment name..." required="required" minLength={2} />
                            <span id="vName" className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <input type="submit" onClick={props.sendFormHandler} value={props.submitName? props.submitName: "Create"} className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export const EnvironmentHeader = (props) => {
    return(
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Environment</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2 customdatafeather">
                    <Link className="btn btn-sm" to={props.to}  title="Environment" > 
                        <ChevronsLeft /> Back
                    </Link>
                </div>
            </div>
        </div>
    )
}

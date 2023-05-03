import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import {Edit3, Trash2} from 'react-feather';
import { getUriPath } from '../../../URI';

const TableContext = React.createContext({});

export const ContentSection = (props) => {
    
    if(props.Payload.dataState.Environment.length > 0){
        return (
            <TableContext.Provider value={props.Payload}>
                <div className="table-responsive">
                    <table className="table table-hover table-sm" id="um-table">
                        <thead>
                            <tr>
                                <TBHeadChecker />
                                <th scope = "col" className="col-md-10">
                                    Environments
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                                <EnvironmentDataTag />
                        </tbody>
                    </table>
                </div>
            </TableContext.Provider>
        )
    }
    else{
        return(
        <>
            <p>Create new variables.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
        </>
        )
    }
}

const EnvironmentDataTag = () => {
    var {dataState, setDataState, setOptionsState, deleteHandler} = useContext(TableContext);
    
    let handleCheckBoxOnChange = (e) => {
        var d = dataState.Environment.map((data) => {
            let dt = (parseInt(e.target.id) === data.id) ? { ...data, Select: !data.Select} : data
            return dt;
        });
        setDataState({
            Environment: d
        });
        setOptionsState({Select: false});
    
    }

    const environmentDataItems = dataState.Environment.map((data) => {
        const {id, name, Select} = data;
        
        return(
            <tr key={id}>
                <td>
                    <div className="form-check" id="form-check">
                        <input className={"form-check-input checksTag"} type="checkbox" 
                            checked={Select} id={id} 
                            onChange={handleCheckBoxOnChange} />
                    </div>
                </td>
                <td>
                    <Link to={`${getUriPath("EnvOptions")}/${id}`} title="View">
                        {name}
                    </Link>
                </td>
                <td className='customdatafeather'>
                    <Link to={`${getUriPath("EnvironmentEdit")}/${id}`}  title="Edit" > 
                        <Edit3 />
                    </Link> &nbsp;&nbsp;&nbsp;&nbsp;
                    
                    {/* delete is only available when environment is not in use--> */}
                    {/* data-toggle="modal" data-target="#Modal-Env-@id" */}
                    
                    <Link 
                        onClick={() => {
                                deleteHandler(data.id)
                                ; return false;
                            } 
                        }
                        title="Delete" > 
                        <Trash2 />
                    </Link>  &nbsp;&nbsp;
                    
                </td>
            </tr>
        )
    });

    return environmentDataItems;
}



const TBHeadChecker = () => {
    var {dataState, setDataState, options, setOptionsState} = useContext(TableContext);
    
    const actionHandler = () => {
        var d = dataState.Environment.map((data) => {
            return({ ...data, Select: !options.Select})
        });
        setDataState({
            Environment: d
        });
        setOptionsState({Select: !options.Select});
    }

    return(
        <th className='col-xs-1' style={{width: "1%"}}>
            <div className="form-check" id="form-check">
                <input className={"form-check-input ToggleTag"} checked={options.Select} 
                    onChange={actionHandler} type="checkbox" 
                />
            </div>
        </th>
    )
}



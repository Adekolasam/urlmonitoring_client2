import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom"
import {Edit3, Trash2, Eye,EyeOff} from 'react-feather';
import { getUriPath } from '../../../URI';
import configData from "../../../Config.json";
import { decryptData } from '../../Shared';

const TableContext = React.createContext({});

export const ContentSection = (props) => {
    if(props.Payload.dataState.length > 0){
        return (
            <TableContext.Provider value={props.Payload}>
                <div className="table-responsive">
                    <table className="table table-hover table-sm" id="um-table">
                        <thead>
                            <tr>
                                <TBHeadChecker />
                                <th >Name</th>
                                <th>Value</th>
                                <th>Type</th>
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
    var {dataState, setDataState, setOptionsState, deleteHandler, useEffectState, setUseEffectState} = useContext(TableContext);
    const ENVOPTTYPE = configData.ENVOPTTYPE;
    const mask = configData.Mask;

    const handleCheckBoxOnChange = (e) => {
        var d = dataState.map((data) => {
            let dt = (parseInt(e.target.id) === data.id) ? { ...data, Select: !data.Select} : data
            return dt;
        });
        setDataState({
            Environment: d
        });
        setOptionsState({Select: false});
    
    }

    const viewHandler = (id) => {
        var d = dataState.map((data) => {
            let dt = (parseInt(id) === data.id) ? { ...data, View: !data.View} : data
            return dt;
        });
        setDataState(d);
        setUseEffectState(!useEffectState);
    }


    const environmentDataItems = dataState.map((data) => {
        const {id, variable, typeId, typeName, value, Select, View} = data;
        const eyeLink = !View ? <Eye /> : <EyeOff/>
        var viewLink = () => typeId == ENVOPTTYPE.Secret.Value ? 
            <Link onClick={() => {
                viewHandler(id); 
                return false;
                }}  title="View" >
                {eyeLink}
            </Link> : 
            ""
        var dValue = () => {
            if(typeId == ENVOPTTYPE.Secret.Value && !View) return mask;
            else if(typeId == ENVOPTTYPE.Secret.Value && View) return decryptData(value);
            else return value;
        }

        return(
            <tr key={id}>
                <td >
                    <div className="form-check" id="form-check">
                        <input className={"form-check-input checksTag"} type="checkbox" 
                            checked={Select} id={id} 
                            onChange={handleCheckBoxOnChange} />
                    </div>
                </td>
                <td className='col-4'>
                    <Link to={`${getUriPath("EnvOptions")}/${id}`} title="View">
                        {variable}
                    </Link>
                </td>
                <td className='col-5'>
                    <span id={`cont-{id}`}>{dValue()}</span>
                </td>
                <td scope="row">
                    {typeName}
                </td>
                <td className='customdatafeather'>
                    <Link to={`${getUriPath("EnvOptionsEdit")}/${id}`}  title="Edit" > 
                        <Edit3 />
                    </Link> &nbsp;&nbsp;&nbsp;&nbsp;
                    
                    {/* delete is only available when environment is not in use--> */}
                    {/* data-toggle="modal" data-target="#Modal-Env-@id" */}
                    
                    <Link 
                        onClick={() => {
                                deleteHandler(data.id); 
                                return false;
                            } 
                        }
                        title="Delete" > 
                        <Trash2 />
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    {viewLink()}
                    
                </td>
            </tr>
        )
    });

    return environmentDataItems;
}



const TBHeadChecker = () => {
    var {dataState, setDataState, options, setOptionsState} = useContext(TableContext);
    
    const actionHandler = () => {
        var d = dataState.map((data) => {
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



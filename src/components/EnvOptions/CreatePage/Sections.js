import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom"
import {Edit3, Trash2, Eye,EyeOff} from 'react-feather';
import { getUriPath } from '../../../URI';
import configData from "../../../Config.json";
import {EnvOptionContext} from "../Context.js"


export const EnvOptionForm = () => {
    var {formData,formResponse, handleFormChange, submitFormHandler} = useContext(EnvOptionContext);
    const ENVOPTTYPE = configData.ENVOPTTYPE
    //const [varType, setVarType] = useState({Type: ENVOPTTYPE.Text.Value})
    
    const typeSwitch = (val) => {
        switch(val){
            case ENVOPTTYPE.Secret.Value:{
                document.getElementById('Value').type = ENVOPTTYPE.Secret.Key; 
                return;
            }
            case ENVOPTTYPE.Text.Value: {
                document.getElementById('Value').type = ENVOPTTYPE.Text.Key; 
                return;
            }
            default: return;
        }
    }

    const typeHandler = (e) => {
        let val = parseInt(e.target.value)

        typeSwitch(val);
        handleFormChange(e);
    }

    const typeChecker = (val) => (formData.TypeId == parseInt(val) ? true : false);
    
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <form method="post">
                        <div className="form-group">
                            <label className="control-label">Name</label>
                            <input className="form-control" 
                                name='Variable' value={formData.Variable} onChange={handleFormChange} 
                                placeholder="Enter variable name..." required minLength={2} 
                            />
                            <span className="text-danger">{formResponse.fields.Variable == "" ? "" : formResponse.fields.Variable}</span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" >
                                Type: &nbsp;&nbsp;&nbsp;
                            </label>
                            <div className="form-check-inline" >
                                <input className="form-check-input"  
                                    checked={typeChecker(ENVOPTTYPE.Text.Value)}
                                    onChange={typeHandler} type="radio" name="TypeId" id="OptionType" value={ENVOPTTYPE.Text.Value} 
                                />
                                <label className="form-check-label" htmlFor="TypeId">
                                    Text
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <input className="form-check-input" 
                                    checked={typeChecker(ENVOPTTYPE.Secret.Value)}
                                    onChange={typeHandler} type="radio" name="TypeId" id="OptionType" value={ENVOPTTYPE.Secret.Value} 
                                />
                                <label className="form-check-label" htmlFor="TypeId">
                                    Secret
                                </label>
                            </div>
                            <span className="text-danger">{formResponse.fields.TypeId == "" ? "" : formResponse.fields.TypeId}</span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Value</label>
                            <input className="form-control" type="text" name='Value' id='Value' 
                                value={formData.Value} onChange={handleFormChange} 
                                placeholder="Enter variable value..." required minLength={1} 
                            />
                            <span className="text-danger">{formResponse.fields.Value == "" ? "" : formResponse.fields.Value}</span>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create" className="btn btn-primary" onClick={submitFormHandler} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}




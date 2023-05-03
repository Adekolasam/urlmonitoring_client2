import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import configData from "../../../Config.json";
import axios from  "axios";
import { Link, useLocation, useParams } from "react-router-dom"
import {ChevronsLeft} from 'react-feather';
import { EnvOptionForm } from './Sections';
import {EnvOptionContext} from "../Context.js"
import RenderDataSection from '../../RenderDataSelection';
import { getUriPath } from '../../../URI';
import { FormAlert } from '../../FormsUtil/FormAlert';
import { encryptData } from '../../Shared';
import { addEnvOption } from '../../../appContext/actions/envOptionAction';


export default function EnvOptCreate(props){
    const {envId} = useParams();
    const storeEnvironment = useSelector((state) => state.environmentReducer.Environments).find((env) => env.id == envId);
    const [environment, setEnvironment] = useState({id: 0, name: ""});
    const baseEndPoint = configData.urlMonitoringBaseUrl;
    const dispatch = useDispatch();

    const [componentState, setComponentState] = useState({
        isLoaded: true,
        isErrorLoading: false,
        reload: false
    });




    //const [varTypes, setVarTypes] = useState({});
    const [formData, setFormData] = useState({
        Variable: "",
        TypeId: 1,
        Value: ""
    });
    const [formResponse, setFormResponse] = useState({
        show: false,
        success: false,
        message: "",
        fields: {
            EnvironmentId: "",
            Variable: "",
            TypeId: "",
            Value: ""
        }
    });
    
    
    useEffect(() => {
        construct();
        document.title = environment.name;
    }, [
        environment.id,
        baseEndPoint,
        componentState
    ]);


    const construct = () => {
        if(envId == null || !(envId > 0)){
            setComponentState({...componentState,
                isLoaded: true,
                isErrorLoading: true
            });
        }
        else if(environment.id  == 0 || envId != environment.id){ 
            if(storeEnvironment != null)
                setEnvironment(storeEnvironment)
            else{ 
                axios
                .get(configData.urlMonitoringBaseUrl+"Environment/"+envId)
                .then(data => {
                    setEnvironment(data.data);
                })
            }
        }
        return;
    }

    const handleFormChange = (event) =>{
        const {name, value} = event.target ;
        setFormData({...formData, [name]: value});
        return;
    }

    const submitFormHandler = (event) =>{
        event.preventDefault();

        if(formData.Variable.length < 3 || formData.Value.length < 2){
            if(formData.Variable.length < 3)
                setFormResponse({...formResponse,
                    show: true,
                    success: false,
                    message: "One or more validation errors occurred.",
                    fields: {...formResponse.fields,
                        Variable: "Enter min of 2 characters for this field."
                    }
                });
            if(formData.Value.length < 2)
                setFormResponse({...formResponse,
                    show: true,
                    success: false,
                    message: "One or more validation errors occurred.",
                    fields: {...formResponse.fields,
                        Value: "The value field is required."
                    }
                });
                
            return;
        }

        const endPoint = configData.urlMonitoringBaseUrl+"EnvOptions"
        var encryptedValue = (parseInt(formData.TypeId) == configData.ENVOPTTYPE.Secret.Value ?  encryptData(formData.Value) : formData.Value)
        
        axios
        .post(endPoint, {
            EnvironmentId: environment.id,
            Variable: formData.Variable,
            TypeId: formData.TypeId,
            Value: encryptedValue
        })
        .then(data => {
            dispatch(addEnvOption({
                id: data.data.id,
                environmentId: environment.id,
                variable: formData.Variable,
                typeId: formData.TypeId,
                value: encryptedValue,
                environmentName: environment.name,
                typeName: '',
                deleteable: true,
                Select: false,
                View: false
            }));
            setFormResponse({
                show: true,
                success: true,
                message: "Variable has been created.",
                fields: {
                    EnvironmentId: "",
                    Variable: "",
                    TypeId: "",
                    Value: ""
                }
            })
            setFormData({...formData,
                Variable: "",
                TypeId: 1,
                Value: ""
            })
            return;
        })
        .catch(error => {  //console.log(error.response.data)
            setFormResponse({...formResponse,
                show: true,
                success: false,
                message: error.response.data.errors.Name != null ? error.response.data.errors.Name : error.response.data.title,
                fields: {
                    EnvironmentId: error.response.data.errors.EnvironmentId,
                    Variable: error.response.data.errors.Variable,
                    TypeId: error.response.data.errors.TypeId,
                    Value: error.response.data.errors.Value
                }
            })
            return;
        });
        return;
    }
    
    return(
        <EnvOptionContext.Provider value={{formData,formResponse, handleFormChange, submitFormHandler}}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h2 className="h2">Create Variable</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2 customdatafeather">
                        <Link to={`${getUriPath("EnvOptions")}/${environment.id}`}  title="Back" className="btn btn-sm"> 
                            <ChevronsLeft /> Back
                        </Link>&nbsp;&nbsp;&nbsp;&nbsp;

                    </div>
                </div>
            </div>
            
            {formResponse.show ? 
                    <FormAlert formResponseState={formResponse} 
                        onclickHandler={() => {
                            setFormResponse({...formResponse, show: false});}
                        } 
                    />
                : "" 
            }
            <RenderDataSection 
                componentState={componentState} 
                component = {() => <EnvOptionForm />} 
            />
            
        </EnvOptionContext.Provider>
    );
}



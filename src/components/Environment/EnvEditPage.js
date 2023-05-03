import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {getUriPath } from '../../URI';
import configData from "../../Config.json";
import axios from  "axios";
import { useDispatch, useSelector } from 'react-redux'
import { updateEnvironment } from '../../appContext/actions/environmentAction';
import { EnvironmentForm, EnvironmentHeader } from './Shared';
import { FormAlert } from '../FormsUtil/FormAlert';
import { Pagination } from 'react-bootstrap';
import RenderDataSection from '../RenderDataSelection';

export default function EnvEditPage(){
    const {envId} = useParams();
    const dispatch = useDispatch();

    //get environments from state as array
    //then run .find method to return first element that meet criteria
    const storeEnvironment = useSelector((state) => state.environmentReducer.Environments).find((env) => env.id == envId);
    const [environment, setEnvironment] = useState({id: 0, name: ""});

    const [componentState, setComponentState] = useState({
        isLoaded: false,
        isErrorLoading: false,
        reload: false
    });

    const [formState, setFormState] = useState({
        Name: environment != null ? environment.name : ""
    })

    const [formResponseState, setFormResponseState] = useState({
        show: false,
        success: false,
        message: "",
    })

    

    useEffect(() => {
        document.title = "Update Environments";
        construct();
        // if(environment == null)
        //     return window.location.replace(getUriPath("Environment"));
        
    }, [
        formResponseState.show,
        environment.id
    ]);

    const construct = () => {
        if(envId == null || !(envId > 0)){
            setComponentState({...componentState,
                isLoaded: true,
                isErrorLoading: true
            });
        }
        else if(environment.id  == 0 || envId != environment.id){ 
            
            axios
            .get(configData.urlMonitoringBaseUrl+"Environment/"+envId)
            .then(data => { 
                setEnvironment(data.data);
                setFormState({
                    Name: data.data.name
                })
            })
            
        
        }

        setComponentState({...componentState,
            isLoaded: true
        });
        return;
    }

    const formHandler = (event) => {
        setFormState({
            [event.target.name] : event.target.value
        })
    }

    const sendFormHandler = (event) => {
        event.preventDefault();

        if(formState.Name.length < 2){
            setFormResponseState({
                show: true,
                success: false,
                message: "The Name field is required.",
            })
            return;
        }

        const endPoint = configData.urlMonitoringBaseUrl+"Environment/"+environment.id

        axios
        .put(endPoint, {
            name: formState.Name
        })
        .then(() => {
            dispatch(updateEnvironment({id: environment.id, name: formState.Name}));
            setFormResponseState({
                show: true,
                success: true,
                message: "Environment has been updated.",
            })
            //setFormState({Name:""});
            return;
        })
        .catch(error => {
            setFormResponseState({
                show: true,
                success: false,
                message: error.response.data.errors.Name != null ? error.response.data.errors.Name : error.response.data.title,
            })
            return;
        });
        
        event.preventDefault();
    }
    
    return(
        <>
            <EnvironmentHeader to={getUriPath("Environment")} />

            {formResponseState.show ? 
                    <FormAlert formResponseState={formResponseState} 
                        onclickHandler={() => {
                            setFormResponseState({...formResponseState, show: false});}
                        } 
                    />
                : "" 
            }

            <RenderDataSection
                componentState={componentState} 
                component = {() => <EnvironmentForm formState={formState} sendFormHandler={sendFormHandler} formHandler={formHandler} submitName="Update" />} 
            />
        </>
    );
}
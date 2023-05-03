import React, { useEffect, useState } from 'react';
import {getUriPath } from '../../URI';
import configData from "../../Config.json";
import axios from  "axios";
import { useDispatch } from 'react-redux'
import { addEnvironment } from '../../appContext/actions/environmentAction';
import { FormAlert } from '../FormsUtil/FormAlert';
import { EnvironmentForm, EnvironmentHeader } from './Shared';

export default function EnvNewPage(){
    const [formState, setFormState] = useState({
        Name: ""
    })

    const [formResponseState, setFormResponseState] = useState({
        show: false,
        success: false,
        message: "",
    })

    const dispatch = useDispatch();
    
    useEffect(() => {
        document.title = "Create New Environments";
    }, [formResponseState.show]);

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

        const endPoint = configData.urlMonitoringBaseUrl+"Environment"

        axios
        .post(endPoint, {
            name: formState.Name
        })
        .then(data => {
            dispatch(addEnvironment(data.data));
            setFormResponseState({
                show: true,
                success: true,
                message: "Environment has been saved.",
            })
            setFormState({Name:""});

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
            <EnvironmentForm formState={formState} sendFormHandler={sendFormHandler} formHandler={formHandler} />
        </>
    );
}
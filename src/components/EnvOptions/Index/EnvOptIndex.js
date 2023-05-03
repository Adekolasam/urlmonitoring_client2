import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import configData from "../../../Config.json";
import axios from  "axios";
import { Link, useLocation, useParams } from "react-router-dom"
import {ChevronsLeft} from 'react-feather';
import RenderDataSection from '../../RenderDataSelection';
import { ContentSection } from './ContentSection';
import SubContent from "./SubContent"
import { ActionAlert } from '../../ActionAlert';
import { Pagination } from '../../Pagination';
import {PlusCircle, Trash2} from 'react-feather';
import { getUriPath } from '../../../URI';
import { loadEnvOption } from '../../../appContext/actions/envOptionAction';
import { ModalInfo, AlertBody, ModalAlert } from '../../Shared';
import { decryptData } from '../../Shared';

export default function EnvOptIndex(props){
    const {envId} = useParams();
    const storeEnvironment = useSelector((state) => state.environmentReducer.Environments).find((env) => env.id == envId);
    const [environment, setEnvironment] = useState({id: 0, name: ""});
    const baseEndPoint = configData.urlMonitoringBaseUrl;
    const dispatch = useDispatch();

    const [paginationData, setPaginationData] = useState({
        pageNumber: 1,
        pageSize: 3, //configData.Pagination.PageSize,
        metaData: {
            CurrentPage: 0
        }
    })
    
    const [componentState, setComponentState] = useState({
        isLoaded: false,
        isErrorLoading: false,
        reload: false
    });

    const [dataState, setDataState] = useState({
        Environment: []
    });

    const [options, setOptionsState] = useState({
        Select: false,
        View: false
    });

    const [useEffectState, setUseEffectState] = useState(false);
    
    const [showInfoModal, setShowInfoModal] = useState({
        Show: false,
        Title: "Info",
        Body: ""
    });

    const [showActionModal, setActionModalModal] = useState({
        Show: false,
        Title: "Alert",
        Body: "",
        clickHandler: null
    });
    
    
    //alert states and functions 
    const [responseMessage, setResponseMessage] = useState({
        show: false,
        header: "",
        message: ""
    });
    
    const handleAlertClose = () => setResponseMessage({...responseMessage,
        show: false
    });

    

    useEffect(() => { 
        construct();
        document.title = environment.name;

        if(!componentState.isLoaded || componentState.reload)
            if(environment.id > 0) fetchData();

        //console.log("useEffect: ", environment)
        
    }, 
        [   componentState.isLoaded,
            componentState.reload,
            paginationData.pageNumber,
            options.Select,
            useEffectState,
            baseEndPoint,
            environment.id
        ]
    );

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

    const fetchData = () => {
        var endPoint = baseEndPoint+"GetPaginatedEnvOptions?id="+environment.id
            +"&PageNumber="+paginationData.pageNumber
            +"&PageSize="+paginationData.pageSize 
        
        axios
        .get(endPoint)
        .then(data => {
            setPaginationData({...paginationData,
                metaData: JSON.parse(data.headers["x-pagination"])
            })

            var rawData = data.data.map((data) => {
                return {...data, Select: false, View: false};
            });
            dispatch(loadEnvOption(rawData));
            setDataState(rawData);
            setComponentState({ ...componentState,
                isLoaded: true,
                reload: false
            });
            return;
        })
        .catch(error => {
            setComponentState({...componentState,
                isLoaded: true,
                isErrorLoading: true
            });
            return;
        });
    }

    const deleteHandler = async (id) => {
        var environment = dataState.Environment.filter((el) => {
            return el.id === id;
        })[0];
        
        if(!environment.deleteable){
            setShowInfoModal({...showInfoModal,
                Show: true,
                Body: AlertBody("warning", "Ooops! One or more collection associated to this environment.")
            });
            return;
        }
        
        setActionModalModal({
            Show: true,
            Body: AlertBody("warning", "Are you sure you want to delete the environment?"),
            clickHandler: () => {
                deleteHandlerFinal(environment.id)
                setActionModalModal({...setActionModalModal, Show: false})
            }
        })

        return;
    }

    const deleteHandlerFinal = async (id) => {
        let endPoint = baseEndPoint+"Environment/"+id;
        
        axios
        .delete(endPoint) //.get(endPoint, configData.axiosConfig.headers)
        .then(() => {
            setShowInfoModal({...showInfoModal,
                Show: true,
                Body: AlertBody("success", "Environment deleted successfully.")
            });

            setComponentState({ ...componentState,
                reload: true
            });
            return;
        })
        .catch(error => {
            AlertBody("warning","Seomthing went wrong.")
            return;
        });
        
    }


    const deleteMultipleHandler = async () => {
        var environment = dataState.Environment.filter((el) => {
            return el.Select === true;
        })
        .filter((el) => {
            return el.deleteable === true;
        });

        if(environment.length > 0){
            setActionModalModal({
                Show: true,
                Body: AlertBody("warning", "Are you sure you want to delete the environments?"),
                clickHandler: () => {
                    deleteMultipleHandlerFinal(environment)
                    setActionModalModal({...setActionModalModal, Show: false})
                }
            })
        }
        
        return;
    }

    const deleteMultipleHandlerFinal = async (envList) => {
        let endPoint = baseEndPoint+"Deleteenvironments/";
        var ids = envList.map((el) => el.id)
        axios
        .delete(endPoint, {
            data: {
                ids: ids
            }
        }) 
        .then(() => {
            setShowInfoModal({...showInfoModal,
                Show: true,
                Body: AlertBody("success", "Environment deleted successfully.")
            });

            setComponentState({ ...componentState,
                reload: true
            });
            return;
        })
        .catch(error => {
            AlertBody("warning","Seomthing went wrong.")
            return;
        });
        
    }

    const deleteHandler2 = (varId) => {
        if(varId > 0){
            const endPoint = configData.urlMonitoringBaseUrl+"EnvOptions/"+varId
        
            axios
            .get(endPoint) //.get(endPoint, configData.axiosConfig.headers)
            .then(data => {
                setResponseMessage({
                    show: true,
                    header: "Successful!",
                    message: "Record has been deleted."
                })
                setComponentState({...componentState,
                    isLoaded: true
                });
                return;
            })
            .catch(error => {
                setResponseMessage({
                    show: true,
                    header: "Failed!",
                    message: "Something went wrong."
                })
                return;
            });
        }
        return;
    }

    const paginationHandler = (val) => {
        
        if(typeof val != "number" || isNaN(val))
            return;

        setPaginationData({...paginationData,
            pageNumber: val
        })

        setComponentState({...componentState,
            reload: true
        });

        return;
    }


    
    const subComp = () => <ContentSection
            Payload={
                {
                    dataState,
                    setDataState,
                    options,
                    setOptionsState,
                    deleteHandler,
                    useEffectState, 
                    setUseEffectState
                }
            } 
         />
    
    return(
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h2 className="h2">{(environment != null ? environment.name : "")} Variables</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2 customdatafeather" >
                        <Link to="/Environment"  title="Back" className="btn btn-sm"> 
                            <ChevronsLeft /> Back
                        </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-sm btn-outline-secondary" 
                            onClick={deleteMultipleHandler}
                            title="Trash" ><Trash2 /> Trash
                        </Link>
                        <Link className="btn btn-sm btn-outline-secondary" 
                            to={`${getUriPath("EnvOptionsAdd")}/${environment.id}`} title="New" ><PlusCircle /> New
                        </Link>
                    </div>
                </div>
            </div>
            <ActionAlert handleClose={handleAlertClose} content={responseMessage} />
            <RenderDataSection 
                componentState={componentState} 
                component = {subComp} 
            />
            
            {(componentState.isLoaded && (paginationData.metaData.TotalPages != null && paginationData.metaData.TotalPages > 1)) ?
                <Pagination pageData={paginationData.metaData} handler={paginationHandler} /> :
                ""
            }
            
        </>
    );
}




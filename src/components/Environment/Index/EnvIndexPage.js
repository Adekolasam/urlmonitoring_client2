import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import configData from "../../../Config.json";
import axios from  "axios";
import { Link } from "react-router-dom"
import {PlusCircle, Trash2} from 'react-feather';
import RenderDataSection from '../../RenderDataSelection';
import { getUriPath } from '../../../URI';
import { loadEnvironment } from '../../../appContext/actions/environmentAction';
import { Pagination } from '../../Pagination';
import { ContentSection } from './ContentSection';
import { ModalInfo, AlertBody, ModalAlert } from '../../Shared';

export default function EnvIndexPage () {
    const baseEndPoint = configData.urlMonitoringBaseUrl;
    const dispatch = useDispatch();

    const [paginationData, setPaginationData] = useState({
        pageNumber: 1,
        pageSize: configData.Pagination.PageSize,
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
        Select: false
    });
    
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

    useEffect(() => {
        document.title = "Environments";
        
        if(!componentState.isLoaded || componentState.reload)
            fetchData();
    }, 
        [
            componentState.isLoaded,
            componentState.reload,
            paginationData.pageNumber,
            options.Select,
            baseEndPoint
        ]
    );

    const fetchData = async () => {
        var endPoint = baseEndPoint+"GetPaginatedEnvironments?PageNumber="
                +paginationData.pageNumber
                +"&PageSize="+paginationData.pageSize
        axios
        .get(endPoint) //.get(endPoint, configData.axiosConfig.headers)
        .then(data => {
            setPaginationData({...paginationData,
                metaData: JSON.parse(data.headers["x-pagination"])
            })

            var rawData = data.data.map((data) => {
                return {...data, Select: false};
            });
            dispatch(loadEnvironment(rawData));
            setDataState({
                Environment: rawData
            });
            
            setComponentState({ ...componentState,
                isLoaded: true,
                reload: false
            });
            //console.log(paginationData);
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
                    setOptionsState({Select: false});
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
    
    
        
    //let currentPath = useCurrentPath();
    //{`${currentPath}/EnvOptions`} in methods
    //let navigate = useNavigate();
    //let match = useRouteMatch();
    
    const subComp = () => <ContentSection 
            Payload={
                {
                    dataState,
                    setDataState,
                    options,
                    setOptionsState,
                    deleteHandler
                }
            } 
         />
         
    return(
        <>
            <ModalInfo info = {showInfoModal} handleClose = {() => setShowInfoModal({...showInfoModal, Show: false})} />
            <ModalAlert 
                info = {showActionModal} 
                handleClose = { () => setActionModalModal({...setActionModalModal, Show: false})}
            />
            {/* border-bottom */}
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                <h1 className="h2">{document.title}</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2 customdatafeather">
                        <Link className="btn btn-sm btn-outline-secondary" 
                            onClick={deleteMultipleHandler}
                            title="Trash" ><Trash2 /> Trash
                        </Link>
                        <Link className="btn btn-sm btn-outline-secondary" 
                            to={getUriPath("EnvironmentAdd")} title="New" ><PlusCircle /> New</Link>
                    </div>
                </div>
            </div>
            <RenderDataSection 
                componentState={componentState} 
                component = {subComp}
            />
            
            {(componentState.isLoaded && (paginationData.metaData.TotalPages != null && paginationData.metaData.TotalPages > 1)) ?
                <Pagination pageData={paginationData.metaData} handler={paginationHandler} /> :
                ""
            }
            
        </>
    )
    
}


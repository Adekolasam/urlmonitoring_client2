import { useState } from "react";
import { matchRoutes, useLocation, createSearchParams } from "react-router-dom";

const namedPathsList = {
    Dashboard: {path: '/'},

    Environment: {path: '/Environment'}, 
    EnvironmentAdd: {path: '/Environment/New'},
    EnvironmentEdit: {path: '/Environment/Edit'},
    EnvironmentDelete: {path: '/Environment/Delete'}, 

    EnvOptions: {path: '/Environment/EnvOptions'},
    EnvOptionsAdd: {path: '/Environment/EnvOptions/New'},
    EnvOptionsEdit: {path: '/Environment/EnvOptions/Edit'},
    EnvOptionsDelete: {path: '/Environment/EnvOptions/Delete'}
}

// export const paths = [
//     {path: '/'},
//     {path: '/Environment'},
//     {path: '/Environment/EnvOptions'},
//     {path: '/Environment/EnvOptions/New'}
// ]
export const uriRoutes = () => {
    let namedPaths = [];

    for(const [key, value] of Object.entries(namedPathsList)){
        //console.log(value) console.log(key)
        namedPaths.push(value);
    }

    return namedPaths;
}


export const getUriPath = (uri) => namedPathsList[uri].path;


export const useCurrentPath = () => {
    const location = useLocation();
    let paths2 = uriRoutes();
    const [{ route }] = matchRoutes(paths2, location)
    
    return route.path
}


export const Navigator = ({navigate, event ,pathname, payload}) => {
    event.preventDefault();
    console.log(pathname);
    navigate({
        pathname: pathname,
        search: createSearchParams(payload).toString()
    });
}


{/* <Link to="#" onClick={(event) => { 
                                let pathname  = `${currentPath}/EnvOptions`;
                                let payload = {id: data.id, name: data.name}
                                Navigator({navigate, event, pathname,  payload})
                            }}  title="View"></Link> */}
import Spinner from "./Spinner";
import Error01 from './Error01';

const RenderDataSection = (props) =>{
    const {isLoaded, isErrorLoading} = props.componentState;
    
    if(!isLoaded && !isErrorLoading) return(<Spinner />);
    else if (isLoaded && !isErrorLoading) return (props.component())
    else if (isLoaded && isErrorLoading)
        return(
            <Error01 statuscode="404" shortmessage="Something went wrong." 
                details="Something went wrong with loading data to this page. Contact the administrator."/>
        )
        
}

export default RenderDataSection;
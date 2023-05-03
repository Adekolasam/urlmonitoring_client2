import { Route, Routes} from "react-router-dom"
import DashboardPage from "./components/Home/Dashboard";
import EnvIndexPage from "./components/Environment/Index/EnvIndexPage"
import EnvOptIndex from "./components/EnvOptions/Index/EnvOptIndex";
import EnvOptCreate from "./components/EnvOptions/CreatePage/EnvOptCreate";
import { getUriPath } from "./URI";
import EnvNewPage from "./components/Environment/EnvNewPage";
import EnvEditPage from "./components/Environment/EnvEditPage";
import Error01 from "./components/Error01";

const Router = () => {
    return(
        <Routes>
            <Route path={getUriPath("Dashboard")} exact element={<DashboardPage />} />
            <Route path={getUriPath("Environment")} element={<EnvIndexPage />} />
            <Route path={getUriPath("EnvironmentAdd")} element={<EnvNewPage />} />
            <Route path={`${getUriPath("EnvironmentEdit")}/:envId`} element={<EnvEditPage />} />
            <Route path={`${getUriPath("EnvOptions")}/:envId`} element={<EnvOptIndex />} />
            <Route path={`${getUriPath("EnvOptionsAdd")}/:envId`} element={<EnvOptCreate />} />
            <Route path="*" element={<Error01 statuscode="404" shortmessage="Something went wrong." 
                details="Page not found."/>} />
        </ Routes>
    )
}

export default Router
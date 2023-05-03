import * as Icon from 'react-feather';
import { Switch, Link} from "react-router-dom"
import { getUriPath } from '../../URI';


function SideNavBar(){

    let featherIconSize = 16;

    return(
            <nav className="col-md-2 d-none d-md-block bg-light sidebar" id="um-nav">
                <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" to={getUriPath("Dashboard")}>
                            <Icon.Home size={featherIconSize} />
                            Dashboard <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={getUriPath("Environment")}>
                            <Icon.MinusSquare size={featherIconSize} />
                            Environments
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.Layers size={featherIconSize} />
                            Collections
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.Link size={featherIconSize} />
                            URLs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.Minimize2 size={featherIconSize} />
                            Flows
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">
                            <span dataFeather="file"></span>
                            Orders
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.Users size={featherIconSize} />
                            User
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.BarChart2 size={featherIconSize} />
                            Reports
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.File size={featherIconSize} />
                            Privacy
                        </a>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Favourite Reports</span>
                    <a className="d-flex align-items-center text-muted" href="#">
                        <Icon.PlusCircle size={featherIconSize} />
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.FileText size={featherIconSize} className = "feather" />
                            Daily
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.FileText size={featherIconSize}/>
                            Current month
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.FileText size={featherIconSize} />
                            Last quarter
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <Icon.FileText size={featherIconSize} />
                            Yearly
                        </a>
                    </li>
                    </ul>
                </div>
            </nav>
    )
}

export default SideNavBar;
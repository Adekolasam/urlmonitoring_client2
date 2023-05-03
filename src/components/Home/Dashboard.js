import {Calendar} from 'react-feather';

export default function DashboardPage() {
    document.title = "Dashboard Page";
    
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary">Share</button>
                    <button className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle customdatafeather">
                    <Calendar />
                    This week
                </button>
            </div>
        </div>
    )
}


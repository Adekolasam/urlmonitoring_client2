

export const Pagination = (props) => {
    const {TotalPages,CurrentPage, HasPrevious,HasNext} = props.pageData;

    const getLink = (tag) => {
        switch(tag){
            case "First":
                return (
                    <button className="page-link" onClick={() => props.handler(1)}>First</button>
                );
            case "NoFirst":
                return (
                    <button className="page-link">First</button>
                );
            case "Previous":
                return (
                    <button className="page-link"  onClick={() => props.handler(CurrentPage - 1)} >Previous</button>
                );
            case "NoPrevious":
                return (
                    <button className="page-link">Previous</button>
                );
            case "Next":
                return (
                    <button className="page-link" onClick={() => props.handler(CurrentPage + 1)}>Next</button>
                );
            case "NoNext":
                return (
                    <button className="page-link">Next</button>
                );
            case "Last":
                return (
                    <button className="page-link" onClick={() => props.handler(TotalPages)}>Last</button>
                );
            case "NoLast":
                return (
                    <button className="page-link">Last</button>
                );
            default:
                return;
            
        }
    
    }

    
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    {getLink((CurrentPage===1) ? "" : "First")}
                </li>
                <li className="page-item">
                    {getLink((!HasPrevious) ? "" : "Previous")}
                </li>
                <li className="page-item active">
                    <button className="page-link">{CurrentPage}<span className="sr-only">(current)</span></button>
                </li>
                <li className="page-item">
                    {getLink((!HasNext) ? "" : "Next")}
                </li>
                <li className="page-item">
                    {getLink(!(CurrentPage < TotalPages) ? "" : "Last")}
                </li>
            </ul>
        </nav>
    );
}
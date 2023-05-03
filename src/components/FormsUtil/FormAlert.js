

export const FormAlert = (props) => {
    const {formResponseState} = props;
    let alertClass = formResponseState.success ? "success" : "warning";
    let alertPreText = formResponseState.success ? "Yaay!" : "Oops!";
    let msg = formResponseState.message

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6" id='formvalidation'>
                    <div className={`alert alert-${alertClass} alert-dismissible fade show`} role="alert">
                        <strong>{alertPreText}</strong> {msg}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" 
                            onClick={props.onclickHandler}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import configData from "../Config.json";
import CryptoJS from 'crypto-js'
export const ModalInfo = (props) => {
    let {info, handleClose} = props;

  return (
      <Modal show={info.Show} onHide={handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{info.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{info.Body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export const ModalAlert = (props) => {
    let {info, handleClose} = props;

  return (
        <Modal show={info.Show} onHide={handleClose}>
            <Modal.Header closeButton={true}>
                <Modal.Title>{info.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{info.Body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={info.clickHandler}>
                    Ok
                </Button>
            </Modal.Footer>
      </Modal>
  );
}


export const AlertBody = (type, text) => {
    return (
        <div className={"alert alert-"+type} role="alert">
            {text}
        </div>
    );
}


export const encryptData = (text) => {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    configData.Salt
  ).toString();

  return data
};

export const decryptData = (text) => {
  const bytes = CryptoJS.AES.decrypt(text, configData.Salt);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

// export const Checked = (props) => {
//     return (
//         <div className="form-check" id="form-check">
//             <input className={"form-check-input "+props.className} onClick={props.onClickHandler} type="checkbox" value=""/>
//             <label className="form-check-label" htmlFor="flexCheckDefault">
//                 {props.label}
//             </label>
//         </div>
//     )
// }


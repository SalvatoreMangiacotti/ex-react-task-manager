// Hooks
import ReactDOM from 'react-dom';

function Modal(props) {

    // passaggio delle proprietà (props) in maniera ordinata
    const { title, content, show = false, onClose, onConfirm, confirmText = "Conferma" } = props;


    return show && ReactDOM.createPortal(
        <div className="modal-container">
            <div className="modal">
                <h2>{title}</h2>
                <span>{content}</span>
                <button onClick={onClose}>Annulla</button>
                <button onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>,
        // document.body inserisce il contenuto in <body>
        // ma fuori dal normale flusso di rendering React
        document.body
    )

}

export default Modal;
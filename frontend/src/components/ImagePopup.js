import React from 'react'

function ImagePopup(props) {
    const imageModalClass = Object.keys(props.card).length !== 0 ? 'modal_opened' : '';

    return (
        <div className = {`modal modal-figure ${imageModalClass}`}>
            <div className="modal__container">
                <figure className="modal__figure">
                    <img src={props.card.link} alt={props.card.name} className="modal__image" />
                    <figcaption className="modal__image-caption">{props.card.name}</figcaption>
                </figure>
                <button aria-label="Close" type="button" className="modal__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;

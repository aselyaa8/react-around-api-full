import React from 'react';

function InfoTooltip(props) {

  return (
    <div className={`modal modal_opened`} >
      <div className="modal__container infotooltip">
        <img alt='error status' src={props.imgSrc} className="infotooltip__img"/>
        <h2 className="infotooltip__heading">{props.message}</h2>
        <button aria-label="Close" type="button" className="modal__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;

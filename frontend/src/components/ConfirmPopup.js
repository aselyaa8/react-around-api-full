
import React from 'react'

function ConfirmPopup(props) {
  const modalClass = props.isOpen ? 'modal_opened' : '';
  function handleDeleteConfirmClick(e) {
    e.preventDefault();
    props.handleCardDeleteConfirm()
  }
  return (
    <div className={`modal modal-figure ${modalClass}`}>
      <div className="modal__container">
        <form className="form form-delete-confirm" name="delete-confirm">
          <h2 className="form__heading">Are you sure?</h2>
          <button aria-label="delete-confirm" type="submit" className="form__save-button" onClick={handleDeleteConfirmClick}>Yes</button>
        </form>
        <button aria-label="Close" type="button" className="modal__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ConfirmPopup;

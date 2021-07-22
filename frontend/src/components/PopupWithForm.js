import React from 'react';

function PopupWithForm(props) {
  let modalClassName = `modal modal-${props.name}`;
  modalClassName = modalClassName + (props.isOpen ? ' modal_opened' : '');

  return (
    <div className={modalClassName}>
      <div className="modal__container">
        <form className="form" name="edit-profile" onSubmit={props.onSubmit}>
          <h2 className="form__heading">{props.title}</h2>
          {props.children}
          <button aria-label="Submit" type="submit" className="form__save-button">Save</button>
        </form>
        <button aria-label="Close" type="button" className="modal__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;

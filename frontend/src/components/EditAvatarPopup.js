import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarInput = useRef("")

    function handleAvatarSubmit(e) {
        e.preventDefault();
        props.onUpdateUserAvatar(avatarInput.current.value);
        avatarInput.current.value = "";
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAvatarSubmit} title={"Change profile picture"} name="avatar-edit" >
           <input ref={avatarInput} id="description-input" type="url" name="avatar-url" className="form__input form__input_type_description"
          minLength="2" maxLength="200" placeholder="url" required />
        <span id="description-input-error" className="form__input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
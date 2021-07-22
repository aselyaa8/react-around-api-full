import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// Subscription to the context


function EditProfilePopup(props) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title={"Edit profile"} name="edit" >
            <input value={name} onChange={handleNameChange} id="name-input" type="text" name="name" className="form__input form__input_type_name" minLength="2"
                maxLength="40" placeholder="Name" required />
            <span id="name-input-error" className="form__input-error"></span>
            <input value={description} onChange={handleDescriptionChange} id="description-input" type="text" name="about" className="form__input form__input_type_description"
                minLength="2" maxLength="200" placeholder="About" required />
            <span id="description-input-error" className="form__input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
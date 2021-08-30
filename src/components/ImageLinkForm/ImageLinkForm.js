import React from 'react'
import "./ImageLinkForm.css"


const ImageLinkForm = ({onInputChange, onImageSubmit}) => {
    return (
        <>
            <p className="form">
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className="input-box">
                <input type="text" onChange={onInputChange}/>
                <button className="grow" onClick={onImageSubmit}>Detect</button>
            </div>
        </>
    );
}

export default ImageLinkForm;

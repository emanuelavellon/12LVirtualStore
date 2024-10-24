import React from 'react';
import '../styles/modal.scss'

export function Modal ({ isOpen, onClose, _height="450px", children }) {
    if (!isOpen) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{height: _height}}>
                <span className="close" onClick={onClose}>&times;</span>
                {children} 
            </div>
        </div>
    );
};

export default Modal;
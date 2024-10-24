import React from 'react';
import useEscapeKey from '../hooks/useScapeKeyToClose';
import '../styles/modal.scss'

export function Modal({ isOpen, onClose, _height = "370px", children }) {
    useEscapeKey(isOpen, onClose);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ height: _height }}>
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}

export default Modal;
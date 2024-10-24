import React from 'react';
import { useEffect } from 'react';
import '../styles/modal.scss'

export function Modal ({ isOpen, onClose, _height="370px", children }) {
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    
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
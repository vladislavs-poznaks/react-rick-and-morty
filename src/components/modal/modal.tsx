import React, {FC} from "react";
import './modal.css';

type Props = {
    onClick: () => void
}

const Modal: FC<Props> = ({children, onClick}) => {
    return (
        <div
            className="background z-50 rounded-xl fixed top-0 left-0 h-full w-full flex items-center shadow-lg overflow-y-auto"
        >
            <div className="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
                <div className="bg-gray-900 rounded">
                    <div className="flex justify-end pr-4 pt-2">
                        <button
                            className="text-3xl leading-none hover:text-gray-300"
                            onClick={onClick}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="modal-body px-8 py-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
import { forwardRef } from "react";

import { IoIosHelpCircle } from "react-icons/io";
const HelperComponent = forwardRef((props, ref) => {



    return (<>

        <button onClick={() => ref.current.showModal()} className="flex items-center justify-center p-2 rounded-full text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoIosHelpCircle size={24} />
        </button>

        <dialog ref={ref} className="p-5 mx-auto my-auto rounded shadow-md max-w-sm">
            <button onClick={() => ref.current.close()} className="mb-4 text-blue-500 0">
                Close
            </button>

            <div className="space-y-2">
                <div className="flex items-center">
                    <span className="font-semibold">r command</span>
                    <span className="mx-2">-</span>
                    <span>rect</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">f command</span>
                    <span className="mx-2">-</span>
                    <span>free pen</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">Ctrl + C command</span>
                    <span className="mx-2">-</span>
                    <span>clear the canvas</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">h command</span>
                    <span className="mx-2">-</span>
                    <span>helper commands</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">c command</span>
                    <span className="mx-2">-</span>
                    <span> circle commands</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold">e command</span>
                    <span className="mx-2">-</span>
                    <span>Eraser commands</span>
                </div>
            </div>
        </dialog>
    </>
    );
})

HelperComponent.displayName = "HelperComponent"
export default HelperComponent;
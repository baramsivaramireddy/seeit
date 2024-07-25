
import { useRef } from "react";
import { LuLayoutPanelLeft } from "react-icons/lu";
const PanelComponent = (props) => {

    const {
        fillStyle,
        lineWidth,
        strokeStyle,
        handleLineWidth,
        handlefillStyle,
        handlefillStroke } = props;
    const ref = useRef(null);


    return (<>
        <button onClick={() => ref.current.show()} className="flex items-center justify-center p-2 rounded-full text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <LuLayoutPanelLeft size={24} />
        </button>

        <dialog ref={ref} className="p-5 mx-auto my-auto rounded shadow-md max-w-sm">
            <button onClick={() => ref.current.close()} className="mb-4 text-blue-500 0">
                Close
            </button>


            <div className="flex flex-col gap-5">
                <label>
                    fill style :
                    <input value={fillStyle} onChange={handlefillStyle} type="color" />
                </label>
                <lavel>
                    stroke style:
                    <input value={strokeStyle} onChange={handlefillStroke} type='color' />
                </lavel>
                <label>
                    line width
                    <input value={lineWidth} onChange={handleLineWidth} type="range" min={0} max={100} />
                </label>
            </div>
        </dialog>

    </>)
}

export default PanelComponent;
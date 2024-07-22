import { FaPen } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { MdOutlineHorizontalRule } from "react-icons/md";

const ToolBar = (props) => {

    const { selectedTool } = props;


 
    return (<>


        <div className="flex gap-5 flex-col shadow-2xl py-4 px-5 rounded-lg ">
            <button className={`text-blue-500`}>  <RiRectangleLine size={30} /></button>
            <button   > <FaPen size={30} /> </button>
            <button    >  <MdOutlineHorizontalRule size={30} /></button>
        </div>

    </>)
}

export default ToolBar;
import React, {  useState } from 'react'
import { FaSquareCheck } from "react-icons/fa6";
import { CiSquareCheck } from "react-icons/ci";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import './Style.css'

export default function ListItem(props) {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  return (
    <>
    
      <div style={{borderRadius:"10px", padding:"5px"}}>
        <li className='list-group-item d-flex justify-content-between' >

          <div className='d-flex justify-content-center' style={{ textAlign: "center" }}>
            <p className={isChecked ? "done fw-medium" : " fw-semibold"} style={{ verticalAlign: "middle", margin: 'auto' }} >{props.task.value}</p>
          </div>

          <div className='d-flex justify-content-center' style={{ alignItems: "center" }}>
            {
              !isChecked ?
                <>
                  <button className='icon'><CiSquareCheck onClick={handleCheck} style={{ color: "darkblue" }} /></button>
                  <button className='icon'><AiOutlineEdit style={{ color: "green" }} onClick={() => props.handleEdit(props.task.id)} /></button>
                </>
                :
                <>
                  <button className='icon'><FaSquareCheck onClick={handleCheck} style={{ color: "darkblue" }} /></button>
                  <button className='icon'><AiOutlineEdit aria-disabled style={{ color: "gray" }} /></button>
                </>

            }

            <button className='icon'><MdDeleteForever style={{ color: "red" }} onClick={() => props.remove(props.task.id)} /></button>
          </div>

        </li>
      </div>

    </>
  )
}

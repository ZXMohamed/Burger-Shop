import React from 'react'
import { BiSolidErrorAlt } from "react-icons/bi";

function AlertError({ title }) {

  return (
   <div className="menuAlert"><BiSolidErrorAlt /> {title}</div>
  )
}

export default AlertError
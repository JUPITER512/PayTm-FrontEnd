import React, { useCallback, useState ,useEffect} from 'react'
import { useRecoilState } from 'recoil'

const Inputbox = ({label,placeholder,stateAtom}) => {
  const [value,setValue]=useRecoilState(stateAtom)
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, [setValue]);
  return (
    <div>
      <div className=' text-sm font-medium text-left py-2'>
        {label}
      </div>
      <input placeholder={placeholder} value={value} onChange={handleChange} className='w-full px-2 py-1 border'/>
    </div>
  )
}

export default Inputbox

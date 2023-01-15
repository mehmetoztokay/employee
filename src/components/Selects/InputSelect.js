import React from 'react'
import Select from 'react-select'

const stylesOfSelect = {
  control: (styles, state) => ({ ...styles, outline: 0, borderRadius: 6, padding: 2, boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : null }),
  menuList: (styles) => ({ ...styles, backgroundColor: 'transparent', borderRadius: 6 }),
  option: (styles, state) => ({ ...styles, backgroundColor: state.isFocused ? '#bfdbfe' : 'white', color: '#000' })
}

const InputSelect = (props) => {
  return <Select {...props} styles={stylesOfSelect} />
}

export default InputSelect

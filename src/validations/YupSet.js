import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Zorunlu alan'
  },
  string: {
    min: 'Min ${min}',
    max: 'Max ${max}'
  }
})

export default Yup

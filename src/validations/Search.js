import Yup from 'validations/YupSet'

export const SearchSchema = Yup.object().shape({
  searchValue: Yup.string().required().min(3, 'Minimum 3 karakter')
})

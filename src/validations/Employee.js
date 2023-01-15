import Yup from 'validations/YupSet'

export const EmployeeSchema = Yup.object().shape({
  fullname: Yup.string().required('İsim giriniz').min(5, 'Min 5 karakter').max(25, 'Maks 25 karakter'),
  email: Yup.string().email('Geçerli bir adres girin').required('Mail giriniz').min(5, 'Min 5 karakter').max(30, 'Maks 30 karakter'),
  maritalStatus: Yup.bool('Geçersiz değer').required('Medeni durum seçiniz'),
  departmentId: Yup.number().required('Departman seçin').min(1, 'Geçerli bir değer giriniz').positive('Geçerli bir değer giriniz')
})

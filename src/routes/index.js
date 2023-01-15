import HomeLayout from 'components/Layouts/HomeLayout'
import HomePage from 'pages/Home'
import NotFound from 'pages/NotFound'

const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes

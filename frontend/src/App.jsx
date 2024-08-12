import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import RegistartionForm from './pages/RegisterTeacher'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import RegistrationFormStudent from './pages/RegisterStudent'
import RegisterClassroom from './pages/RegisterClassroom'
import Layout from './components/Layout'
import { registerTeacher } from './Redux/Slices/Register/registerSlice'
import RegistrationFormTeacher from './pages/RegisterTeacher'
import Classrooms from './pages/Classrooms'
import UpdateStudent from './pages/UpdateStudent'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/register' element={<RegistartionForm />} /> */}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/register/teacher' element={<ProtectedRoute component={RegistrationFormTeacher} roles={['principal']} />} />
            <Route path='/register/student' element={<ProtectedRoute component={RegistrationFormStudent} roles={['principal', 'teacher']} />} />
            <Route path='/classrooms/create' element={<ProtectedRoute component={RegisterClassroom} roles={['principal']} />} />
            <Route path='/classrooms/list' element={<Classrooms/>}/>
            <Route path='/users/update/:id' element={<UpdateStudent/>}/>
          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

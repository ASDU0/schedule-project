import { useEffect, useRef, useState } from 'react'
import CourseList from '../CourseList'
import Input from '../Input'
import SchoolList from '../SchoolList'

import data from '../../schools.json'
import './styles.css'

const Sidebar = () => {
  const [searchSchool, setSearchSchool] = useState('')
  const [searchCourse, setSearchCourse] = useState('')
  const [showModal, setShowModal] = useState({
    open: false,
    target: "",
  })

  const [schools, setSchools] = useState(data)
  const allCourses = schools.map((school, idx) => { return { name: `Course nro ${idx}`, school: school.name } })
  const [selectedCourses, setSelectedCourses] = useState([])

  const menuSchools = useRef('null')
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuSchools.current && !menuSchools.current.contains(e.target)) {
        setShowModal({ target: "", open: false })
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='sidebar'>
      <div ref={menuSchools}>
        <Input
          title='Escuela profesional'
          onFocus={() => setShowModal({ target: "schools", open: true })}
          onChange={(e) => setSearchSchool(e.target.value)}
          value={searchSchool || ''}
        />
        <Input
          title='Asignatura'
          onFocus={() => setShowModal({ target: "courses", open: true })}
          onChange={(e) => setSearchCourse(e.target.value)}
          value={searchCourse || ''}
        />

        <label className='card__title' >Mis cursos</label>
        <CourseList
          data={selectedCourses}
          height={'100%'}
          shadow={false}
        />

        <div className={`menu-${showModal.target} ${showModal.open ? 'display' : 'hidden'}`}>
          {
            showModal.target === "schools"
              ? <SchoolList
                data={data}
                filter={searchSchool}
                onClick={(school) => { setSearchSchool(school); setShowModal({ target: '', open: false }) }}
              />
              : <CourseList
                data={allCourses}
                filterValue={searchCourse}
                onClick={(course) => { setSelectedCourses([...selectedCourses, course]); setShowModal({ target: '', open: false }) }}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
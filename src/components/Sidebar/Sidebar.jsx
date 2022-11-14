import { useEffect, useRef, useState } from 'react'
import CourseList from '../CourseList'
import Input from '../Input'
import SchoolList from '../SchoolList'

import data from '../../schools.json'
import './styles.css'

const Sidebar = () => {
  const [searchSchool, setSearchSchool] = useState({
    id: '',
    name: '',
    img: '',
  })
  const [searchCourse, setSearchCourse] = useState('')
  const [showModal, setShowModal] = useState({
    open: false,
    target: '',
  })

  const selectSchool = ({ id, name, img }) => {
    setSearchSchool({ id, name, img })
  }

  const [schools, setSchools] = useState(data)
  const allCourses = schools.map((school, idx) => { return { name: `Course nro ${idx}`, school: school.name } })
  const [selectedCourses, setSelectedCourses] = useState([])

  const menuSchools = useRef('null')
  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (menuSchools.current && !menuSchools.current.contains(e.target)) {
  //       setShowModal({ target: "", open: false })
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  // }, [])
  console.log(searchSchool)
  return (
    <div className='sidebar'>
      <div>
        <Input
          title='Escuela profesional'
          onFocus={() => setShowModal({ target: "schools", open: true })}
          onChange={(e) => setSearchSchool({ ...searchSchool, name: e.target.value })}
          value={searchSchool.name}
          img={searchSchool.img && <img src={searchSchool.img} />}
          onClickIcon={() => setSearchSchool({ id: '', name: '', img: '' })}
          children={
            <SchoolList
              data={data}
              filter={searchSchool.name}
              onClick={(school) => { selectSchool(school) }}
            />
          }
        />
        <Input
          title='Asignatura'
          onFocus={() => setShowModal({ target: "courses", open: true })}
          onChange={(e) => setSearchCourse(e.target.value)}
          value={searchCourse}
          onClickIcon={() => setSearchCourse('')}
          children={
            <CourseList
              data={allCourses}
              filterValue={searchCourse}
              onClick={(course) => { setSelectedCourses([...selectedCourses, course]); setSearchCourse('') }}
              key={Math.random()}
            />}
        />
      </div>
      <label className='card__title'>Mis cursos</label>
      <CourseList
        data={selectedCourses}
        shadow={false}
        key={Math.random()}
      />
    </div>
  )
}

export default Sidebar
{/* <div className={`${showModal.target} ${showModal.open ? 'display' : 'hidden'}`}>
  {
    showModal.target === "schools"
      ? <SchoolList
        data={data}
        filter={searchSchool.name}
        onClick={(school) => { selectSchool(school); setShowModal({ target: '', open: false }) }}
      />
      : <CourseList
        data={allCourses}
        filterValue={searchCourse}
        onClick={(course) => { setSelectedCourses([...selectedCourses, course]); setSearchCourse(''); setShowModal({ target: '', open: false }) }}
        key={Math.random()}
      />
  }
</div> */}
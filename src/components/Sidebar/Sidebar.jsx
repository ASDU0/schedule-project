import { useEffect, useState } from 'react'
import CardSchool from '../CardSchool/CardSchool'
import CourseCard from '../CourseCard'
import CourseList from '../CourseList'
import Input from '../Input/Input'
import Tag from '../Tag'
import './styles.css'

import ALLCOURSES from '../../courses.json'
const API_URL = 'http://localhost:4000/api'

const Sidebar = () => {
  const [searchSchool, setSearchSchool] = useState({
    id: '',
    name: '',
    img: '',
  })
  const [searchCourse, setSearchCourse] = useState('')

  const [schools, setSchools] = useState([])

  const [allCourses, setAllCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])

  const SEMESTERS = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  const onClickSelectSchool = (school) => {
    //CALL API
    getCoursesByCareer(school.id)
    setSearchSchool(school)
    setSelectedCourses([])
    setSearchCourse('')
  }
  const getCoursesByCareer = (id) => {
    fetch(`${API_URL}/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) setAllCourses(data.courses)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const removeCourse = (idCourse) => {
    let courseFind = {}
    const filterSelectedCourses = selectedCourses.filter((course) => {
      if (course._id === idCourse) {
        courseFind = course
      } else {
        return course
      }
    })

    setSelectedCourses(filterSelectedCourses)
    setAllCourses([...allCourses, courseFind])
  }

  const resetStates = () => {
    setAllCourses([])
    setSelectedCourses([])
    setSearchCourse('')
    setSearchSchool({
      id: '',
      name: '',
      img: '',
    })
  }
  const selectCourse = (course) => {
    setSelectedCourses([...selectedCourses, course])
    setAllCourses(allCourses.filter((c) => c._id !== course._id))
    setSearchCourse('')
  }

  useEffect(() => {
    fetch(`${API_URL}/careers`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) setSchools(data.careers)
      })
      .catch(err =>
        console.log(err)
      )
  }, [])
  console.log(allCourses)
  return (
    <div className='sidebar'>
      <div>
        <Input
          title='Escuela profesional'
          onChange={(e) => setSearchSchool({ ...searchSchool, name: e.target.value })}
          value={searchSchool.name}
          placeholder={schools.find((school) => school.id === searchSchool.id)?.name || 'Buscar escuela'}
          filterValue={searchSchool.name}
          img={searchSchool.img && <img src={searchSchool.img} />}
          data={schools}
          onClickIcon={resetStates}
          renderItem={(item, hideList) => {
            return (
              <CardSchool
                key={item._id}
                id={item._id}
                name={item.name}
                logo={item.img}
                hideList={hideList}
                onClick={(school) => { onClickSelectSchool(school) }}
              />
            )
          }}
        />
        <Input
          title='Asignatura'
          onChange={(e) => setSearchCourse(e.target.value)}
          value={searchCourse}
          filterValue={searchCourse}
          data={allCourses}
          onClickIcon={() => setSearchCourse('')}
          children={
            <div
              style={{ display: 'flex', gap: '4px', justifyContent: 'center', margin: '10px' }}
            >
              {
                SEMESTERS.map((semester) =>
                  <Tag
                    // onClick={(value) => filterBySemester(value)}
                    active={false}
                    value={semester}
                  />
                )
              }
            </div >
          }
          renderItem={(item, hideList) => {
            return (
              <CourseCard
                key={item._id}
                name={item.name}
                code={item.course}
                semester={item.semester}
                category={item.cat}
                hideList={hideList}
                onClick={() => { selectCourse(item) }}
                flag={true}
              />
            )
          }}
        />
      </div >
      <label className='card__title'>Mis cursos</label>
      <CourseList
        data={selectedCourses}
        shadow={false}
        onClickIcon={(idCourse) => removeCourse(idCourse)}
      />
    </div >
  )
}

export default Sidebar
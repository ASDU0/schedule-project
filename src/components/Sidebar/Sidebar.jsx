import { useState } from 'react'
import CardSchool from '../CardSchool/CardSchool'
import CourseCard from '../CourseCard'
import CourseList from '../CourseList'
import Input from '../Input/Input'
import Tag from '../Tag'
import './styles.css'

import ALLCOURSES from '../../courses.json'
import ALLSCHOOLS from '../../schools.json'
const compareString = (value, filter) => {
  filter = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  return value.includes(filter)
}
const Sidebar = () => {
  const [searchSchool, setSearchSchool] = useState({
    id: '',
    name: '',
    img: '',
  })
  const [searchCourse, setSearchCourse] = useState('')

  const selectSchool = ({ id, name, img }) => {
    setSearchSchool({ id, name, img })
  }
  const SEMESTERS = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  const [schools, setSchools] = useState(ALLSCHOOLS)

  const [allCourses, setAllCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selectedSemesters, setSelectedSemesters] = useState({})

  const filterBySemester = (data) => {
    const semesters = SEMESTERS.filter(name => selectedSemesters[name] ? name : null)
    // console.log({semesters})
    if (semesters.length === 0) return data
    return data.filter(course => semesters.includes(course.semester) ? course : null)
  }

  const filterByName = (data, filterValue) => {
    return data.filter((item) => compareString(item.name, filterValue))

  }

  const onClickSelectSchool = (school) => {
    //CALL API
    setAllCourses(ALLCOURSES.filter((course) => course.career == school.id))
    setSearchSchool(school)
    setSelectedCourses([])
    setSearchCourse('')
  }

  const removeCourse = (idCourse) => {
    let courseFind = {}
    const filterSelectedCourses = selectedCourses.filter((course) => {
      if (course.id === idCourse) {
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
    setAllCourses(allCourses.filter((c) => c.id !== course.id))
    setSelectedSemesters({})
    setSearchCourse('')
  }

  console.log(selectedSemesters)
  return (
    <div className='sidebar'>
      <div>
        <Input
          title='Escuela profesional'
          onChange={(e) => setSearchSchool({ ...searchSchool, name: e.target.value })}
          value={searchSchool.name}
          placeholder={schools.find((school) => school.id === searchSchool.id)?.name || 'Buscar escuela'}
          filterValue={searchSchool.name}
          filters={[{
            filter: filterByName,
            filterValue: searchSchool.name
          }]}
          img={searchSchool.img && <img src={searchSchool.img} />}
          data={schools}
          onClickIcon={resetStates}
          renderItem={(item, hideList) => {
            return (
              <CardSchool
                key={item.id}
                id={item.id}
                name={item.name}
                logo={item.logo}
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
          filterBySemester={selectedSemesters}
          filters={[

            {
              filter: filterBySemester,
              filterValue: selectedSemesters
            }
          ]}
          data={allCourses}
          onClickIcon={() => setSearchCourse('')}
          children={
            <div
              style={{ display: 'flex', gap: '4px', justifyContent: 'center', margin: '10px' }}
            >
              {
                SEMESTERS.map((semester) =>
                  <Tag
                    onClick={(flag) => setSelectedSemesters({ ...selectedSemesters, [semester]: !selectedSemesters[semester] })}
                    active={selectedSemesters[semester] ?? false}
                    value={semester}
                  />
                )
              }
            </div >
          }
          renderItem={(item, hideList) => {
            return (
              <CourseCard
                key={item.id}
                name={item.name}
                semester={item.semester}
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
        key={Math.random()}
        onClickIcon={(idCourse) => removeCourse(idCourse)}
      />
    </div >
  )
}

export default Sidebar
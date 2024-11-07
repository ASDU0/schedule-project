import { Schedule } from 'me-schedule-days'
import { useEffect, useState } from 'react'
import CardSchool from '../CardSchool/CardSchool'
import CourseCard from '../CourseCard'
import CourseList from '../CourseList'
import Input from '../Input/Input'
import Tag from '../Tag'
import './styles.css'

const API_URL = 'http://localhost:3000/api'
// const API_URL = 'https://schedule-backend.onrender.com/api'

const compareString = (value, filter) => {
  filter = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  return value.includes(filter)
}
const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

  const [selectedSemesters, setSelectedSemesters] = useState({ 0: false })
  const SEMESTERS = [...new Set(allCourses.map(({ semester }) => semester))]
    .filter(s => s.length > 0)
  // .sort()

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
    getCoursesByCareer(school.id)

    setSearchSchool(school)
    setSelectedCourses([])
    setSearchCourse('')
  }

  const getCoursesByCareer = (id) => {
    fetch(`${API_URL}/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) setAllCourses(data.courses.map(course => ({ ...course, semester: course.semester })))
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
    setSelectedSemesters({ 0: false })
  }
  const selectCourse = (course) => {
    setSelectedCourses([...selectedCourses, { ...course, color: randomColor() }])
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

  const resetCourseStates = () => {
    setSearchCourse('')
    setSelectedSemesters({ 0: false })
  }
  // console.log(selectedCourses)
  // console.log(allCourses)
  return (
    <>
      <div className='app'>
        <div className='sidebar'>
          <Input
            title='Escuela profesional'
            onChange={(e) => setSearchSchool({ ...searchSchool, name: e.target.value })}
            value={searchSchool.name}
            placeholder={schools.find((school) => school.id === searchSchool.id)?.name || 'Buscar escuela'}
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
            resetValues={resetCourseStates}
            filters={[
              {
                filter: filterBySemester,
                filterValue: selectedSemesters
              },
              {
                filter: filterByName,
                filterValue: searchCourse
              }
            ]}
            data={allCourses}
            onClickIcon={() => setSearchCourse('')}
            children={
              <div style={{ margin: '0.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#444444', fontWeight: 600, }} >Semestres</span>
                  <span style={{ cursor: 'pointer', color: '#444444', fontWeight: 600, }}
                    onClick={resetCourseStates}
                  >Limpiar</span>
                </div>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'start' }}
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
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ color: '#444444', fontWeight: 600, }} >Resultados:</span>
                </div>
              </div>
            }
            renderItem={(item, hideList) => {
              return (
                <CourseCard
                  key={item._id}
                  name={item.name}
                  code={item.course}
                  semester={item.semester}
                  category={item.cat}
                  days={item.days}
                  // hideList={hideList}
                  // hideList={() => setSelectedSemesters({})}
                  onClick={() => { selectCourse(item) }}
                  flag={true}
                />
              )
            }}
          />
          <label className='card__title'>Mis cursos</label>
          <CourseList
            data={selectedCourses}
            shadow={false}
            onClickIcon={(idCourse) => removeCourse(idCourse)}
          />
        </div >
        <Schedule
          courses={selectedCourses.length > 0 ? selectedCourses : [{
            id: '',
            name: '',
            days: {
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
            },
          }]}
          borderRightSchedule
          borderBottomSchedule
          backgroundColorSchedule="white"
          onClickId={(id) => removeCourse(id)}
        />
      </div >
    </>
  )
}

export default Sidebar



//sort array to string numbers
const sortArray = (array) => {
  return array
}

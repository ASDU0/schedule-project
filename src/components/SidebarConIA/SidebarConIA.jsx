import { useEffect, useState } from "react";
import Input from "../Input/Input";
import CardSchool from "../CardSchool/CardSchool";
import { Schedule } from "me-schedule-days";
import Tag from "../Tag";
import './styles.css'

const API_URL = 'https://schedule-backend.onrender.com/api'
// const API_URL = 'http://localhost:3000/api'

const turnos = [
  {
    name: 'Mañana',
  },
  {
    name: 'Tarde',
  },
  {
    name: 'Noche',
  },
  {
    name: 'Mas inteligente',
  },
]

const SidebarConIa = () => {
  const [schools, setSchools] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeTurno, setActiveTurno] = useState('Mañana');
  const [selectedSemesters, setSelectedSemesters] = useState({});
  const [searchSchool, setSearchSchool] = useState({
    id: '',
    name: '',
    img: '',
  });

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

  const filterByName = (data, filterValue) => {
    return data.filter((item) => compareString(item.name, filterValue))
  }

  const compareString = (value, filter) => {
    filter = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
    value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
    return value.includes(filter)
  }

  const onClickSelectSchool = (school) => {
    getCoursesByCareer(school.id)
    setSearchSchool(school)
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

  const onClickButtonSubmit = () => {
    const moreIntelligent = activeTurno === 'Mas inteligente'
    if (moreIntelligent) {
      getScheduleGenerateBySemestre()
    } else {
      getScheduleOptimizeBySemestre()
    }
  }

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  const getScheduleOptimizeBySemestre = () => {
    const carrera = searchSchool.id
    if (!carrera) {
      console.log('No hay cursos seleccionados')
      return
    }
    const semestre = Object.keys(selectedSemesters).filter(semester => selectedSemesters[semester])[0]
    if (!semestre) {
      console.log('No hay semestre seleccionado')
      return
    }

    const turno = activeTurno.toLowerCase()

    fetch(`${API_URL}/courses/schedule/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        carrera,
        semestre,
        turno,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setSelectedCourses([])
          data.data.forEach((element, index) => {
            setTimeout(() => {
              const color = randomColor()
              // Usa una función para actualizar el estado y asegurar que sea inmutable
              setSelectedCourses(prevCourses => [...prevCourses, { ...element, color: randomColor() }]);
            }, 500 * index); // Multiplica por el índice para añadir un retraso incremental
          });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

 

  const getScheduleGenerateBySemestre = () => {
    const carrera = searchSchool.id
    if (!carrera) {
      console.log('No hay cursos seleccionados')
      return
    }
    const semestre = Object.keys(selectedSemesters).filter(semester => selectedSemesters[semester])[0]
    if (!semestre) {
      console.log('No hay semestre seleccionado')
      return
    }

    const turno = activeTurno.toLowerCase()

    fetch(`${API_URL}/courses/schedule/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        carrera,
        semestre,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setSelectedCourses([])
          if (data.data.length === 0) {
            console.log('No se pudo generar el horario')
            return
          }
          data.data[0].forEach((element, index) => {
            setTimeout(() => {
              const color = randomColor()
              // Usa una función para actualizar el estado y asegurar que sea inmutable
              setSelectedCourses(prevCourses => [...prevCourses, { ...element, color: randomColor() }]);
            }, 500 * index); // Multiplica por el índice para añadir un retraso incremental
          });
        }
      }
      )
      .catch(err => {
        console.log(err)
      })
  }

  const resetStates = () => {
    setSearchSchool({
      id: '',
      name: '',
      img: '',
    })
    setAllCourses([])
    setSelectedCourses([])
    setSelectedSemesters({})
    setActiveTurno('Mañana')
  }

  const SEMESTERS = [...new Set(allCourses.map(({ semester }) => semester))]
    .filter(s => s.length > 0).sort((a, b) => a - b) // .sort()

  return (
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
        {allCourses.length !== 0 && (
          <div>
            <label className='card__title' >Semestres</label>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'start' }}
            >
              {SEMESTERS.map((semester) =>
                <Tag
                  onClick={() => setSelectedSemesters({
                    [semester]: !selectedSemesters[semester]
                  })}
                  active={selectedSemesters[semester] ?? false}
                  value={semester}
                />
              )}
            </div>
            {SEMESTERS.length !== 0 && (
              <>
                <div className="mt-5-app">
                  <label className='card__title'>Turno</label>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'start' }}
                  >
                    {turnos.map((turno) => (
                      <div
                        className={`${turno.name === activeTurno ? 'active-turno-app' : 'turno-app'} `}
                        onClick={() => setActiveTurno(turno.name)}
                      >
                        {turno.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5-app">
                  <div
                    className="generate-with-ia-app"
                    onClick={onClickButtonSubmit}
                  >
                    Generar horario con IA
                  </div>
                </div>
              </>
            )}
          </div>
        )}


      </div>
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
      // onClickId={(id) => removeCourse(id)}
      />
    </div>
  );
}

export default SidebarConIa;
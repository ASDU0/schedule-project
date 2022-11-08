import { useRef, useEffect, useState } from 'react'
import Input from '../Input'
import CourseCard from '../CourseCard'
import Schools from '../SchoolList'

import './styles.css'
import data from '../../schools.json'

const Sidebar = () => {
    const [searchSchool, setSearchSchool] = useState('')
    const [searchCourse, setSearchCourse] = useState('')
    const [showModal, setShowModal] = useState(false)

    const inpuRef = useRef('null')
    useEffect(() => {
        console.log(inpuRef.current.value)
    }, [])
    console.log('render')
    return (
        <div className='sidebar'

            onBlur={() => setShowModal(false)}
        >
            <div>

            </div>
            <Input
                title='Escuela profesional'
                onFocus={() => setShowModal(true)}
                ref={inpuRef}
                onChange={(e) => setSearchSchool(e.target.value)}
            />
            <Input title='Asignatura' />
            <CourseCard />
            <div className={`schools-modal ${!showModal ? 'hidden' : 'display'}`}>
                <Schools data={data} filter={searchSchool} />
            </div>
        </div>
    )
}

export default Sidebar
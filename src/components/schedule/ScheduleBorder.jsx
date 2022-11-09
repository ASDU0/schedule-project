import { ContainerSchedule } from './containerSchedule/ContainerSchedule';
import { ContainerVoid } from './containerVoid/ContainerVoid';
import styles from './styles.module.scss';

export const ScheduleBorder = () => {
  // const hours = [
  //   '7:00 - 8:00',
  //   '8:00 - 9:00',
  //   '9:00 - 10:00',
  //   '10:00 - 11:00',
  //   '11:00 - 12:00',
  //   '12:00 - 13:00',
  //   '13:00 - 14:00',
  //   '14:00 - 15:00',
  //   '15:00 - 16:00',
  //   '16:00 - 17:00',
  //   '17:00 - 18:00',
  //   '18:00 - 19:00',
  //   '19:00 - 20:00',
  //   '20:00 - 21:00',
  // ];

  const courses = [
    {
      id: '01',
      name: 'Procesamiento de Lenguaje Natural',
      days: {
        monday: ['7:00 - 8:00', '8:00 - 9:00'],
        tuesday: [],
        wednesday: ['7:00 - 8:00', '8:00 - 9:00'],
        thursday: [],
        friday: ['7:00 - 8:00'],
        saturday: [],
      },
      color: 'red',
      dateInit: '5451727642724',
      dateEnd: '5451727642724',
    },
    {
      id: '02',
      name: 'Programación I',
      days: {
        monday: [],
        tuesday: ['7:00 - 8:00', '8:00 - 9:00'],
        wednesday: ['7:00 - 8:00', '8:00 - 9:00'],
        thursday: [],
        friday: ['7:00 - 8:00'],
        saturday: ['8:00 - 9:00'],
      },
      color: 'black',
    },
    {
      id: '03',
      name: 'Programación I',
      days: {
        monday: [],
        tuesday: ['7:00 - 8:00', '8:00 - 9:00'],
        wednesday: ['7:00 - 8:00', '8:00 - 9:00'],
        thursday: [],
        friday: ['7:00 - 8:00'],
        saturday: [],
      },
      color: 'green',
    },
    {
      id: '04',
      name: 'Programación I',
      days: {
        monday: ['7:00 - 8:00', '8:00 - 9:00'],
        tuesday: ['7:00 - 8:00', '8:00 - 9:00'],
        wednesday: ['7:00 - 8:00', '8:00 - 9:00'],
        thursday: [],
        friday: ['7:00 - 8:00'],
        saturday: [],
      },
      color: 'pink',
    },
    {
      id: '05',
      name: 'Programación I',
      days: {
        monday: [],
        tuesday: ['7:00 - 8:00', '8:00 - 9:00'],
        wednesday: ['7:00 - 8:00', '8:00 - 9:00'],
        thursday: [],
        friday: ['7:00 - 8:00'],
        saturday: [],
      },
      color: 'gold',
    },
    {
      id: '06',
      name: 'Programación I',
      days: {
        monday: ['7:00 - 8:00'],
        tuesday: ['7:00 - 8:00', '8:00 - 9:00'],
        wednesday: ['8:00 - 9:00'],
        thursday: [],
        friday: ['7:00 - 8:00'],
        saturday: [],
      },
      color: 'orange',
    },
    {
      id: '07',
      name: 'Programación I',
      days: {
        monday: ['7:00 - 8:00'],
        tuesday: ['7:00 - 8:00', '8:00 - 9:00'],
        wednesday: ['8:00 - 9:00'],
        thursday: [],
        friday: ['7:00 - 8:00'],
        saturday: [],
      },
      color: 'blue',
    },
  ];

  const days = ['Horario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  return (
    <div className={styles['container']}>
      <div className={styles['container_schedule']}>
        <div className={styles['container_schedule_top']}></div>
        <div className={styles['container_schedule_header']}>
          {days.map((value, key) => (
            <div key={key} className={styles['container_schedule_header_caps']}>
              <h1 className={styles['container_schedule_header_caps_text']}>
                {value}
              </h1>
            </div>
          ))}
          <div className={styles['container_schedule_header_capsSab']}>
            <h1 className={styles['container_schedule_header_capsSab_text']}>
              Sábado
            </h1>
          </div>
        </div>
        <div className={styles['container_schedule_lineTime']}>
          <div className={styles['container_schedule_lineTime_caps']}>
            <div className={styles['container_schedule_lineTime_caps_text']}>
              <h1
                className={styles['container_schedule_lineTime_caps_text_hour']}
              >
                7:00 - 8:00
              </h1>
            </div>
            <div className={styles['container_schedule_lineTime_caps_mini']}>
              {Object.keys(courses[0].days).map((value) =>
                value === 'monday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.monday.includes('7:00 - 8:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'tuesday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.tuesday.includes('7:00 - 8:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'wednesday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.wednesday.includes('7:00 - 8:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'thursday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.thursday.includes('7:00 - 8:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'friday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.friday.includes('7:00 - 8:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'saturday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.saturday.includes('7:00 - 8:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : (
                  <ContainerVoid
                    className={
                      styles['container_schedule_lineTime_caps_mini_course']
                    }
                  />
                )
              )}
            </div>
          </div>

          <div className={styles['container_schedule_lineTime_caps']}>
            <div className={styles['container_schedule_lineTime_caps_text']}>
              <h1
                className={styles['container_schedule_lineTime_caps_text_hour']}
              >
                8:00 - 9:00
              </h1>
            </div>
            <div className={styles['container_schedule_lineTime_caps_mini']}>
              {Object.keys(courses[0].days).map((value) =>
                value === 'monday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.monday.includes('8:00 - 9:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'tuesday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.tuesday.includes('8:00 - 9:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'wednesday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.wednesday.includes('8:00 - 9:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'thursday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.thursday.includes('8:00 - 9:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'friday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.friday.includes('8:00 - 9:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : value === 'saturday' ? (
                  <>
                    <div
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, key) =>
                        value.days.saturday.includes('8:00 - 9:00') ? (
                          <div>
                            <ContainerSchedule
                              title={value.name}
                              backgroundColor={value.color}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                  </>
                ) : (
                  <ContainerVoid
                    className={
                      styles['container_schedule_lineTime_caps_mini_course']
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

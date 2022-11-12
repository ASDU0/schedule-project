import { courses } from '../../data/courses';
import { days } from '../../data/days';
import { hours } from '../../data/hours';
import { ContainerSchedule } from './containerSchedule/ContainerSchedule';
import styles from './styles.module.scss';

export const ScheduleBorder = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['container_schedule']}>
        <div className={styles['container_schedule_top']}></div>
        <div className={styles['container_schedule_header']}>
          <div className={styles['container_schedule_header_horario']}>
            <h1 className={styles['container_schedule_header_horario_text']}>
              Horario
            </h1>
          </div>
          {days.map((value) => (
            <div
              key={value}
              className={
                value === 'Sábado'
                  ? styles['container_schedule_header_capsSab']
                  : styles['container_schedule_header_caps']
              }
            >
              <h1 className={styles['container_schedule_header_caps_text']}>
                {value}
              </h1>
            </div>
          ))}
        </div>
        <div className={styles['container_schedule_lineTime']}>
          {hours.map((daysVal, key) => (
            <div
              key={daysVal}
              className={
                daysVal === '20:00 - 21:00'
                  ? styles['container_schedule_lineTime_capsEnd']
                  : styles['container_schedule_lineTime_caps']
              }
            >
              <div className={styles['container_schedule_lineTime_caps_text']}>
                <h1
                  className={
                    styles['container_schedule_lineTime_caps_text_hour']
                  }
                >
                  {daysVal}
                </h1>
              </div>
              <div className={styles['container_schedule_lineTime_caps_mini']}>
                {Object.keys(courses[0].days).map((value, keyInd) =>
                  value === 'monday' ? (
                    <div
                      key={keyInd}
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, keyIndex) =>
                        value.days.monday.includes(`${daysVal}`) ? (
                          <ContainerSchedule
                            key={keyIndex}
                            title={value.name}
                            backgroundColor={value.color}
                          />
                        ) : null
                      )}
                    </div>
                  ) : value === 'tuesday' ? (
                    <div
                      key={keyInd}
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, keyIndex) =>
                        value.days.tuesday.includes(`${daysVal}`) ? (
                          <ContainerSchedule
                            key={keyIndex}
                            title={value.name}
                            backgroundColor={value.color}
                          />
                        ) : null
                      )}
                    </div>
                  ) : value === 'wednesday' ? (
                    <div
                      key={keyInd}
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, keyIndex) =>
                        value.days.wednesday.includes(`${daysVal}`) ? (
                          <ContainerSchedule
                            key={keyIndex}
                            title={value.name}
                            backgroundColor={value.color}
                          />
                        ) : null
                      )}
                    </div>
                  ) : value === 'thursday' ? (
                    <div
                      key={keyInd}
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, keyIndex) =>
                        value.days.thursday.includes(`${daysVal}`) ? (
                          <ContainerSchedule
                            key={keyIndex}
                            title={value.name}
                            backgroundColor={value.color}
                          />
                        ) : null
                      )}
                    </div>
                  ) : value === 'friday' ? (
                    <div
                      key={keyInd}
                      className={
                        styles['container_schedule_lineTime_caps_mini_course']
                      }
                    >
                      {courses.map((value, keyIndex) =>
                        value.days.friday.includes(`${daysVal}`) ? (
                          <ContainerSchedule
                            key={keyIndex}
                            title={value.name}
                            backgroundColor={value.color}
                          />
                        ) : null
                      )}
                    </div>
                  ) : value === 'saturday' ? (
                    <div
                      key={keyInd}
                      className={
                        styles[
                          'container_schedule_lineTime_caps_mini_courseSat'
                        ]
                      }
                    >
                      {courses.map((value, keyIndex) =>
                        value.days.saturday.includes(`${daysVal}`) ? (
                          <ContainerSchedule
                            key={keyIndex}
                            title={value.name}
                            backgroundColor={value.color}
                          />
                        ) : null
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

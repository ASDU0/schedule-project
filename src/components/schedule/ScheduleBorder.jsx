import { ContainerSchedule } from './containerSchedule/ContainerSchedule';
import styles from './styles.module.scss';

export const ScheduleBorder = () => {
  const hours = [
    '7:00 - 8:00',
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
  ];

  const courses = [
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
  ];

  const coursesHour = [
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
    'Procesamiento de Lenguaje Natural',
  ];

  const days = ['Horario', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  return (
    <div className={styles['container']}>
      <div className={styles['container_schedule']}>
        <div className={styles['container_schedule_top']}></div>
        <div className={styles['container_schedule_header']}>
          {days.map((value) => (
            <div className={styles['container_schedule_header_caps']}>
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
              {courses.map((value, key) => (
                <div
                  key={key}
                  className={
                    styles['container_schedule_lineTime_caps_mini_course']
                  }
                >
                  {coursesHour.map((value, key) => (
                    <div key={key}>
                      <ContainerSchedule title={value} />
                    </div>
                  ))}
                </div>
              ))}
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
              {courses.map((value, key) => (
                <div
                  key={key}
                  className={
                    styles['container_schedule_lineTime_caps_mini_course']
                  }
                >
                  <ContainerSchedule title={value} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

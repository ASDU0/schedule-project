import styles from './styles.module.scss';

export const ScheduleBorder = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['container_bar']}></div>
      <div className={styles['container_schedule']}>
        <div className={styles['container_schedule_top']}></div>
        <div className={styles['container_schedule_horario']}>
          <h1 className={styles['container_schedule_horario_text']}>Horario</h1>
        </div>
        <div className={styles['container_schedule_hour']}>
          <h1 className={styles['container_schedule_hour_text']}>Lunes</h1>
        </div>
        <div className={styles['container_schedule_day']}>
          <h1 className={styles['container_schedule_day_text']}>Martes</h1>
        </div>
        <div className={styles['container_schedule_day']}>
          <h1 className={styles['container_schedule_day_text']}>Miércoles</h1>
        </div>
        <div className={styles['container_schedule_day']}>
          <h1 className={styles['container_schedule_day_text']}>Jueves</h1>
        </div>
        <div className={styles['container_schedule_day']}>
          <h1 className={styles['container_schedule_day_text']}>Viernes</h1>
        </div>
        <div className={styles['container_schedule_day']}>
          <h1 className={styles['container_schedule_day_text']}>Sábado</h1>
        </div>
      </div>
    </div>
  );
};

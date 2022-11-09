import styles from './styles.module.scss';

export const ContainerSchedule = ({ title, backgroundColor }) => {
  return (
    <div className={styles.container} style={{ background: backgroundColor }}>
      <h1 className={styles.container_text}>{title}</h1>
    </div>
  );
};

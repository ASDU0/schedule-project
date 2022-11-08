import styles from './styles.module.scss';

export const ContainerSchedule = ({ title }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.container_text}>{title}</h1>
    </div>
  );
};

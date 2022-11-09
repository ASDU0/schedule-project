import styles from './styles.module.scss';

export const ContainerVoid = ({ backgroundColor, className }) => {
  return (
    <div className={className}>
      <div>
        <div
          className={styles.container}
          style={{ background: backgroundColor }}
        ></div>
      </div>
    </div>
  );
};

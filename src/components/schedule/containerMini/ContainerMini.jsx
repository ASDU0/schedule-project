import { ContainerSchedule } from '../containerSchedule/ContainerSchedule';

export const ContainerMini = ({ title, backgroundColor, className }) => {
  return (
    <div className={className}>
      <div>
        <ContainerSchedule title={title} backgroundColor={backgroundColor} />
      </div>
    </div>
  );
};

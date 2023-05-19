import styles from './statement-with-icon.module.scss';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface StatementWithIconProps {
  icon: IconDefinition;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const StatementWithIcon = ({ icon, children, className, showIcon = true }: StatementWithIconProps) => {
  return <div className={className}>
    {showIcon &&
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icon} />
      </div>}
    <p className={styles.statement}>
      {children}
    </p>
  </div>;
};

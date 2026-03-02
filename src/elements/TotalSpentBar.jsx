import PropTypes from 'prop-types';
import styles from './TotalSpentBar.module.css';

const TotalBar = ({ children, ...props }) =>{
    return (
        <div className={styles.totalBar} {...props}>
            {children}
        </div>
    );
};

const childrenShape = PropTypes.node.isRequired;

TotalBar.propTypes = {
    children: childrenShape,
};

export { TotalBar };

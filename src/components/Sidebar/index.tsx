import styles from './styles.module.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ReactComponent as LogoSvg } from 'assets/images/icons/logo.svg';
import sidebarData from './data';
import { Navigate, Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

function renderThump({ ...props }) {
  return <div className={styles.thump} {...props} />;
}

function renderView({ ...props }) {
  return <div className={styles.container} {...props} />;
}

export function Sidebar() {
  return (
    <Scrollbars
      className={styles.root}
      autoHide
      autoHideTimeout={800}
      autoHideDuration={200}
      renderThumbHorizontal={renderThump}
      renderThumbVertical={renderThump}
      renderView={renderView}
    >
      <div className={styles.title}>
        <LogoSvg className={styles.logo} />
        <h2>Plugin</h2>
      </div>
      <div className={styles.content}>
        {sidebarData &&
          sidebarData.map((item) => (
            <NavLink
              end
              key={item.label}
              className={({ isActive }) =>
                isActive
                  ? clsx(styles.isActive, styles.list)
                  : clsx(styles.default, styles.list)
              }
              to={item.link}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
      </div>
    </Scrollbars>
  );
}

export default Sidebar;

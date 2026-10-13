import { getModifierClasses } from './helpers';
import './Sidebar.css';

const Sidebar = ({
  children,
  modifier,
  ...props
}: {
  children?: React.ReactNode;
  modifier?: string | string[];
} & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  const modifierClasses = getModifierClasses("c-sidebar", modifier);
  return (
    <div 
      className={`c-sidebar ${modifierClasses}`}
      {...props}>
      { children }
    </div>
  );
};

export default Sidebar;
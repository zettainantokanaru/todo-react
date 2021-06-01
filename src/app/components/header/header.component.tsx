import './header.component.scss';

type Props = {
  children: string
}

const Header = (props: Props) => {
  return (
    <div className="header">
      <span className="header-title">{props.children}</span>
    </div>
  );
}

export default Header;
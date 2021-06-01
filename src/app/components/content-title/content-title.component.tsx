import './content-title.component.scss';

type Props = {
  children: string
}

const ContentTitle = (props: Props) => {
  return (
    <div className="content-title">
      <span className="content-title-text">{props.children}</span>
    </div>
  );
}

export default ContentTitle;
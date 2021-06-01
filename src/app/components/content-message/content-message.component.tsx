import './content-message.component.scss';

type Props = {
  type?: 'info' | 'alert';
  text?: string
}

const ContentMessage = (props: Props) => {
  return (
    <div className="content-message">
      {
        props.type && props.text ? (
          <span className={`content-message-text ${props.type === 'alert' ? 'alert': 'info'}`}>{props.text}</span>
        ): null
      }
    </div>
  );
}

export default ContentMessage;
import style from './Message.module.css'

const Message = ({ msg, type }) => {
  return (
    <div className={`${style[`${type}`]}`}>
      <p>{msg}</p>
    </div>
  )
}

export default Message

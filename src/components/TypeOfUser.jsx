import moment from 'moment';


const TypeOfUser = ({ userLoggedIn, user, message }) => {
  return userLoggedIn.email === user ? (
    <p className="message-text ml-auto bg-[#dcf8c6]">
      {message.text}
      <span className="text-gray-500 p-[5px] pt-[0.5rem] text-[10px] absolute bottom-0 right-0 text-right">
        {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
      </span>
    </p>
  ) : (
    <p className="message-text text-right bg-[whitesmoke]">
      {message.text}
      <span className="text-gray-500 p-[5px] pt-[0.5rem] text-[10px] absolute bottom-0 right-0 text-right">
        {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
      </span>
    </p>
  );
};

export default TypeOfUser;


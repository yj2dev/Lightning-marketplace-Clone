const MessageSection = ({ msgList }) => {
  console.log("section msgList >> ", msgList);
  return (
    <div>
      {msgList.map((msg) => (
        <div>{msg.msg}</div>
      ))}
    </div>
  );
};

export default MessageSection;

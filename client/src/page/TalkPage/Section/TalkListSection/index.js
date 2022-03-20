import { Container } from "./styled";
import { useState } from "react";
import { useLocation, withRouter } from "react-router-dom";

export const TalkListSection = ({ history, user }) => {
  const location = useLocation();
  const [talkList, setTalkList] = useState([]);

  return (
    <Container>
      <div className="title">벼락톡</div>
    </Container>
  );
};

export default withRouter(TalkListSection);

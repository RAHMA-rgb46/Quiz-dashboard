import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function withRouter(Wrapped) {
  return function WithRouterProps(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    return <Wrapped {...props} navigate={navigate} params={params} location={location} />;
  };
}
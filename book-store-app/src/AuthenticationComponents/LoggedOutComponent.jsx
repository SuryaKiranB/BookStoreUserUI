import { useContext } from "react";
import { Link } from "react-router-dom";

const LoggedOutComp = () => {
    return (
      <div>
        <h1>You are not Authenticated</h1>
        <p>New User? <Link to="/registration">Register</Link> </p>
        <p>Not Logged in? <Link to="/">Login</Link> </p>
      </div>
    )
  }

  export default LoggedOutComp
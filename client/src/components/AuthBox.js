import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const AuthBox = ({ register }) => {
  const { getCurrentUser } = useGlobalContext();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {};

    if (register) {
      data = {
        name,
        email,
        password,
        confirmPassword,
      };
    } else {
      data = {
        email,
        password,
      };
    }

    axios
      .post(register ? "api/auth/register" : "api/auth/login", data)
      .then(() => {
        // TODO
        getCurrentUser();
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>
        <form onSubmit={onSubmit}>
          {register && (
            <div className="auth__field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="auth__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth__field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {register && (
            <div className="auth__field">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* <p className="auth__error">
                Something went wrong. Please try again.
              </p> */}
            </div>
          )}

          <div className="auth__footer">
            <p className="auth__error">
              Something went wrong. Please try again.
            </p>

            <button className="btn" type="submit" disabled={loading}>
              {register ? "Register" : "Login"}
            </button>

            {!register ? (
              <div className="auth__register">
                <p>
                  Not a member? <Link to="/register">Register Now</Link>
                </p>
              </div>
            ) : (
              <div className="auth__register">
                <p>
                  Already a member? <Link to="/">Login Now</Link>
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthBox;

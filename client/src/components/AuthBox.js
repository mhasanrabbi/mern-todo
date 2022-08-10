import React from "react";
import { Link } from "react-router-dom";

const AuthBox = ({ register }) => {
  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>
        <form>
          {register && (
            <div className="auth__field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </div>
          )}

          <div className="auth__field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>

          <div className="auth__field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>

          {register && (
            <div className="auth__field">
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="password" />
              {/* <p className="auth__error">
                Something went wrong. Please try again.
              </p> */}
            </div>
          )}

          <div className="auth__footer">
            <p className="auth__error">
              Something went wrong. Please try again.
            </p>

            <button className="btn">{register ? "Register" : "Login"}</button>

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

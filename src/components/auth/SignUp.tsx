import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rootReducer";
import { registerUser } from "../../store/reducers/authModule";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userAuth = useAppSelector(state => state.userAuth);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

     await dispatch(registerUser({ userEmail: email, userPassword: password }));
     if (userAuth.isLoggedIn && userAuth.user ) {
      toast.success("User Registered Successfully!", {
        position: "top-center",
      });
      navigate("/")
     }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

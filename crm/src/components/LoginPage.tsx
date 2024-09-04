import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
   login: () => void;
}
const LoginPage = ({ login }: LoginPageProps) => {
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });

   const navigate = useNavigate();

   const { email, password } = inputs;

   const onChange = (e: any) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   const onSubmit = async (e: any) => {
      e.preventDefault();
      try {
         const response = await axios.post("http://localhost:3000/api/auth/login", {
            email,
            password,
         });

         if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
            message.success("Login successfull !");
            navigate("/dashboard");
         }
         login();
      } catch (error) {
         message.error("Login Failed !!!");
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="p-8 rounded-lg md:shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={onSubmit}>
               <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                     Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     value={email}
                     onChange={onChange}
                     className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                     placeholder="Enter your email"
                     required
                  />
               </div>
               <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                     Password
                  </label>
                  <input
                     type="password"
                     name="password"
                     value={password}
                     onChange={onChange}
                     className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                     placeholder="Enter your password"
                     required
                  />
               </div>
               <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-black/80">
                  Login
               </button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
               Don't have an account?&nbsp;
               <a href="/register" className="text-primary hover:underline">
                  Register
               </a>
            </p>
         </div>
      </div>
   );
};

export default LoginPage;

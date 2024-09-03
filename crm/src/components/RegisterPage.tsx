import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
   const [inputs, setInputs] = useState<{ firstName: string; lastName: string; email: string; password: string }>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
   });
   const navigate = useNavigate();
   const { firstName, lastName, email, password } = inputs;

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         const response = await axios.post("http://localhost:3000/api/auth/register", {
            firstName,
            lastName,
            email,
            password,
         });

         if (response.data.access_token) {
            message.success("Registration successful!");
            console.log(response)
            navigate("/login");
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            message.error(error.response?.data?.message || "Registration Failed!!!");
         } else {
            message.error("An unexpected error occurred. Please try again later.");
         }
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="p-8 rounded-lg md:shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={onSubmit}>
               <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-2">
                     First Name
                  </label>
                  <input
                     type="text"
                     name="firstName"
                     value={firstName}
                     onChange={onChange}
                     className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                     placeholder="Enter your first name"
                     required
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-2">
                     Last Name
                  </label>
                  <input
                     type="text"
                     name="lastName"
                     value={lastName}
                     onChange={onChange}
                     className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                     placeholder="Enter your last name"
                     required
                  />
               </div>
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
                  Register
               </button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
               Already have an account?&nbsp;
               <Link to="/login" className="text-primary hover:underline">
                  Login
               </Link>
            </p>
         </div>
      </div>
   );
};

export default RegisterPage;

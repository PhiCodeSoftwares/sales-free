import React from "react";
import logo from "../images/logo.png"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div>
        <img className="w-96 h-96" src={logo} alt="logo" />
      </div>
      
      <p className={`text-4xl font-bold mb-6 text-primary`}>Seja Bem-vindo</p>
      <p className="text-lg text-gray-600 mb-6 text-background">
        Utilize o menu ao lado para navegar pelas funcionalidades da aplicação.
      </p>
    </div>
  );
};

export default Home;
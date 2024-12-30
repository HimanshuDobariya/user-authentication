import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 sm:px-24">
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;

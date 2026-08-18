// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import { Analytics } from "@vercel/analytics/react";
import "./styles/base.css";
import "./styles/global.css";
import Header from "./components/sections/header";
import Main from "./components/sections/main";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Analytics />
    </>
  );
}

export default App;

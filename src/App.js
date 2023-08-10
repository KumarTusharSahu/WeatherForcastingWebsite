import CurrentWeather from "./CurrentWeather";
import Forcast from"./Forcast";
import React from "react";

function App() {
  return (
    <div className="main_container">
      <div className="parent_container">
        <CurrentWeather/>
        <Forcast/>
        
      </div>
    </div>
  );
}

export default App;

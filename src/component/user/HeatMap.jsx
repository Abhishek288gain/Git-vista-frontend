//heapMap is used for display map of user cotribution on the bases of user repo creation, deletion, follow we create map which track the user 
// activeness on website we create it on right side of userProfile

import React, {useEffect, useState } from "react"
import HeatMap from "@uiw/react-heat-map"

//function to generat random activity
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);//if date endDate = 5 . then in 5 days how many activity done by user 
    data.push(
      { // here we set upto 50 activity can perform by user in given days
        date: currentDate.toISOString().split("T")[0], //YYY-MM-DD
        count: count,
      }
    );

    currentDate.setDate(currentDate.getDate() + 1); //update the Stdate to +1
  }

  return data;
};

const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenValue}, 0)`; // we take only green shade from Math.floor() range from 0 to 255
  }

  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => { //fetch user activeness data  
    const fetchData = async () => { // beacause we genreate random data therefore we define random date for makeing activity
      const startDate = "2001-01-01";
      const endDate = "2001-01-31";
      const data = generateActivityData(startDate, endDate);//On the bases of st and end date genAct() data in arr of obj 
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));// here we fetch max no. of contribution count for each day. and on the bases of that we 
      // we geneate a shads of green 
      setPanelColors(getPanelColors(maxCount)); // set color
    };

    fetchData();
  }, []);// [] beacuse useeffect run for single time

  return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={15}
        space={3}
        rectProps={{
          rx: 2.5,
        }}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;


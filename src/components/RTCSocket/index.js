import React, { useState, useEffect } from "react";
import CanvasDisplay from "./CanvasDisplay";
import PropTypes  from "prop-types";
const SocketComponent = ({setSocketData}) => {
  const [canvasImage, setCanvasImage] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:12345/ws");

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      setSocketData((prevData)=>[...prevData, data.text]);      
      const image = new Image();
      image.src = `data:image/jpeg;base64,${data.image}`;
      image.onload = () => {
        setCanvasImage(image);
      };
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="canvas-container">
      <CanvasDisplay image={canvasImage} />
    </div>
  );
};
SocketComponent.propTypes = {
  setSocketData: PropTypes.func.isRequired,
};
export default SocketComponent;
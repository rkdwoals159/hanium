import React, { useState, useEffect } from "react";

const SocketComponent = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:12345/ws");
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      const image = new Image();
      image.src = `data:image/jpeg;base64,${data.image}`;
      image.onload = () => {
        context.fillStyle = "white";
        context.fillRect(0, 0, 640, 480);
        context.drawImage(image, 0, 0, 640, 480);
      };
    };

    if (socket) {
      socket.addEventListener("message", handleMessage);
    }

    return () => {
      if (socket) {
        socket.removeEventListener("message", handleMessage);
      }
    };
  }, [socket]);

  return (
    <div className="canvas-container">
      <div>여기에용</div>
      <canvas id="canvas" width="640" height="480"></canvas>
    </div>
  );
};

export default SocketComponent;

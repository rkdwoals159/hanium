import { styled } from "@mui/material";
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";

const StyledCanvas = styled("canvas")(() => ({
    borderRadius: 16
}));
const CanvasDisplay = ({ image }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      if (image) {
        context.fillStyle = "white";
        context.fillRect(0, 0, 640, 480);
        context.drawImage(image, 0, 0, 640, 480);
      }
    }, [image]);
  
    return <StyledCanvas ref={canvasRef} id="canvas" width="640" height="480"></StyledCanvas>;
  };
  CanvasDisplay.propTypes = {
    image: PropTypes.object, // 이 부분을 추가합니다.
  };
export default CanvasDisplay;
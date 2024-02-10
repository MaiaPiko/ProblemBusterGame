import bluey1 from "../assets/bluey/bluey.png";
import bluey2 from "../assets/bluey/blueyBlinks.png";
import talkingBluey1 from "../assets/bluey/talking/1.png";
import talkingBluey2 from "../assets/bluey/talking/2.png";
import talkingBluey3 from "../assets/bluey/talking/3.png";
import talkingBluey4 from "../assets/bluey/talking/4.png";
import talkingBluey5 from "../assets/bluey/talking/5.png";
import talkingBluey6 from "../assets/bluey/talking/6.png";
import React, { useEffect, useState, useRef, useContext, useCallback } from "react";
import * as PIXI from "pixi.js";
import { Container, AnimatedSprite, Graphics, useTick, Text, useApp } from "@pixi/react";
import { introContext, startGameContext } from "./Game";




const textures = [
	PIXI.Texture.from(bluey1),
	PIXI.Texture.from(bluey2),
	PIXI.Texture.from(bluey1),

];

const talkingTextures = [
	PIXI.Texture.from(talkingBluey1),
	PIXI.Texture.from(talkingBluey3),
	PIXI.Texture.from(talkingBluey5),
	PIXI.Texture.from(talkingBluey2),
	PIXI.Texture.from(bluey2),
	PIXI.Texture.from(talkingBluey4),
	PIXI.Texture.from(talkingBluey2),
	PIXI.Texture.from(talkingBluey6),
	PIXI.Texture.from(talkingBluey1),
	PIXI.Texture.from(bluey2),
];



function TalkingBluey({ positionX, positionY, scale, currentTextures }) {
	return (
		<Container>
			<Container x={positionX} y={positionY}>
				<AnimatedSprite
					animationSpeed={0.03}
					isPlaying={true}
					scale={scale}
					textures={talkingTextures}
					anchor={0.5}
				/>
			</Container>
		</Container>
	);
}

function WhatBlueySays({ positionX, positionY, stageHeight, stageWidth }) {


	return (
		<Container x={positionX} y={positionY}>
			<Text
				text="Tell me all that's bothering you so we can destroy it together!"
				style={{
					fill: "white",
					wordWrap: true,
					wordWrapWidth: stageWidth/2,
					fontSize: stageWidth*0.06,
          stroke: '#5A5A5A',
          strokeThickness: 5,
          dropShadow: true,
          dropShadowColor: '#5A5A5A',
          dropShadowBlur: 8,
          dropShadowAngle: Math.PI / 4,
          dropShadowDistance: 3,
				}}
			/>
		</Container>
	);
}

function OkayButton ({positionX, positionY, setGameIntro, setStartGame, stageWidth, stageHeight}){
  const buttonRef = useRef();
  const gameStart = useContext(startGameContext);

  // const gameIntro = useContext(introContext)
  const handleMouseOver = () => {
    if (buttonRef.current) {
      buttonRef.current.cursor = "pointer";
    }
  }

  const handleMouseClick = () => {
    if (buttonRef.current) {
      // setGameIntro(false);
      setStartGame(true);

    }
  }
  const buttonWidth = stageWidth/3;
  const buttonHeight = stageHeight/11
  return(
    <>
    <Container>
      <Graphics
        ref = {buttonRef}
        draw={(g) => {
          g.lineStyle(2, 0xff00ff, 1);
          g.beginFill(0xff00bb, 0.25);
          g.drawRoundedRect(positionX, positionY, buttonWidth, buttonHeight, 20);
          // g.drawRoundedRect(app.screen.width/4 + 80, app.screen.height/1.55, 200, 75, 20);

          g.endFill();
        }}
        interactive={true}
        pointerover={handleMouseOver}
        // pointerout={handleMouseOut}
        pointertap={handleMouseClick}
      />

      <Text
        text="Let's go!"
        style={{
          fontFamily: "Arial",
          fontSize: stageWidth*0.07,
          // fontWeight: "bold",
          align: "center",
          fill: ["#ffffff"],
          zIndex: 2,
        }}
        x= {positionX+buttonWidth/2}
        y= {positionY+buttonHeight/2}
        anchor={0.5}
      />
    </Container>
  </>
  )
}


function InputArea({text, inputBoxRef, positionX, positionY, stageWidth}) {
  const app = useApp();
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!text) {
      const intervalId = setInterval(() => {
        setShowCursor((prevShowCursor) => !prevShowCursor);
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [text]);


  function formatInputValue(text) {
    if (text) {
      const words = text.trim().split(",");
      const lastWord = words[words.length - 1].trim();
  
      return lastWord;
    }
    return "";
  }
  

  const handleClick= () =>{
    inputBoxRef(true);
    setTimeout(() => {
      inputBoxRef(false);
    }, 5000);
    
  }

  const lastWord = formatInputValue(text)

  const draw = useCallback((g) => {
    g.lineStyle(2, 0x808080, 1);
    g.beginFill(0xffffff, 1);
    g.drawRect(positionX, positionY, app.screen.width / 3, app.screen.height/12);
    g.endFill();
  }, []);

  const smallerScreen = stageWidth < 769;
  return (
    <>
    {!smallerScreen &&
      <Graphics draw={draw} onClick={handleClick}/>
    }
      {/* Make blinking cursor so users know they can type something... */}
      {showCursor && !text && (
        <Text
          text= "|"
          x={positionX + 5}
          y={positionY}
          style={{
            zIndex: 22,
            fontSize: 30,
            fill: '#20C20E',
            fontWeight:"200"
          }
          
        }
        />
      )}
  {Text && (
        <Text
          text= {lastWord}
          x={(positionX + 10) }
          y={positionY}
          style={{
            zIndex: 22,
            fontSize: 30,
            fill: smallerScreen? '#20C20E' : 'black',
            fontWeight:"200"
          }
          
        }
        />
      )}


    </>
  );
}


export default function GameIntro({setGameIntro, stageWidth, stageHeight,  text, inputBoxRef, setStartGame}) {
	const smallerScreen = stageWidth < 1201;
  const app = useApp();
  const [movingCloser, setMovingCloser] = useState(true);
	const [scale, setScale] = useState(0.01);
	const [position, setPosition] = useState({ x: app.screen.width - app.screen.width/20, y: app.screen.height/2 });
  // const [position, setPosition] = useState({ x: 700, y: 300 });

	const [blueyFinishedTalking, setBlueyFinishedTalking] = useState();

  const gameIntro = useContext(introContext)

	useTick((delta) => {
		if (movingCloser) {
			// Update position to move Bluey closer
			setPosition((prevPosition) => ({
				x: prevPosition.x - 4 * delta, // Adjust the movement speed as needed
				y: prevPosition.y - 6 * Math.sin(prevPosition.x * 0.09), // Add vertical oscillation (bounce)
			}));

			// Update scale to make Bluey bigger
			setScale((prevScale) => prevScale + 0.0035 * delta); // Adjust the scaling speed as needed

			// Check if Bluey reaches the desired scale and position
			// if (position.x <= 250 && position.y <= 400) {
        if (position.x <= app.screen.width/4 && position.y <= stageHeight*0.8) {

				setMovingCloser(false); // Stop the animation
			}
		}
	});

	useEffect(() => {
		if (!movingCloser) {
			// Animation is complete, do something here if needed
			setTimeout(() => {
				setBlueyFinishedTalking(true);
			}, 4000);
		}
	}, [movingCloser]);

 

	return (
		<Container>
			{movingCloser && (
				<Container x={position.x} y={position.y}>
					<AnimatedSprite
						animationSpeed={0.01}
						isPlaying={true}
						scale={scale}
						textures={textures}
						anchor={0.5}
					/>
				</Container>
			)}
      {!blueyFinishedTalking && !movingCloser && (
				<Container>
					<TalkingBluey
						positionX={position.x}
						positionY={position.y}
						scale={scale}
					/>
				

				</Container>
			)}
	

			{!movingCloser && blueyFinishedTalking && (

					<Container x={position.x} y={position.y}>
					<AnimatedSprite
						animationSpeed={0.01}
						isPlaying={true}
						scale={scale}
						textures={textures}
						anchor={0.5}
					/>
          
				</Container>
        	)}
          {!movingCloser && 
          <Container>
        {!text &&
					<WhatBlueySays stageHeight={stageHeight} stageWidth={stageWidth} positionX={position.x + stageWidth/4.5} positionY={position.y - position.y/1.7} />}
          
          <InputArea stageWidth={stageWidth} text={text} positionX={position.x + stageWidth/4.5} positionY={position.y + position.y*0.05}/>
          
          
          <OkayButton positionX={position.x + stageWidth/4.5} 
          positionY={position.y + 120}
        
          setGameIntro={setGameIntro}
          setStartGame={setStartGame}
          stageHeight={stageHeight}
          stageWidth={stageWidth}/>
        <Container
    

         >

          <Text
          text="If nothing is bothering you, you could help me eliminate my pet peeves!"
         
          y={position.y + stageHeight/11 + 130}
          x={position.x } 
          style={{
            fill: ['#e6add8', '#99ccff'], 
            stroke: '#5A5A5A',
          strokeThickness: 2,
          dropShadow: true,
          dropShadowColor: '#5A5A5A',
          dropShadowBlur: 8,
          dropShadowAngle: Math.PI / 4,
          dropShadowDistance: 3,
          wordWrap: true,
					wordWrapWidth: stageWidth/1.5,
          fontSize: stageWidth*0.04,

        fontWeight:200}}
          />
          </Container>
        </Container>}

				


      {text && (
        <>
          <Text
            text='What we will destroy:'
            x={position.x + stageWidth/4.5}
            y={stageHeight - stageHeight / 1.3}
            style={{
              align: 'center',
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 0.080 * stageWidth,
              fontWeight:  '400',
              fontSize: stageWidth/20,
              fill: ['white'],
              stroke: '#5A5A5A',
              strokeThickness: 5,
              dropShadow: true,
              dropShadowColor: '#5A5A5A',
              dropShadowBlur: 8,
              letterSpacing: 2,
              dropShadowAngle: Math.PI / 4,
              dropShadowDistance: 3,
           
              wordWrapWidth: smallerScreen?200: 440,
            }}
          />
          <Text
            text={text}
            x={position.x + stageWidth/4.5}
            y={app.screen.height - app.screen.height /1.38}
            style={{
              align: 'center',
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 0.060*stageWidth,
              fontWeight: '400',
              fill: [ 'white'], // gradient
              stroke: '800080',
              strokeThickness:4,
              letterSpacing: 2,
              dropShadow:true,
              dropShadowColor:'red',
              dropShadowBlur: 15,
              dropShadowDistance: 3,
              dropShadowAngle: Math.PI / 4,
              

              wordWrap: true,
              wordWrapWidth: smallerScreen?200: 440,
            }}
          />
        </>
      )}
		</Container>
	);
}

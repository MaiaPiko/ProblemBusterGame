import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Container, Graphics, Text, useApp } from "@pixi/react";
// import { textAddedContext } from './Game';
import { DisplayObject } from 'pixi.js';

function InputArea({text, inputBoxRef}) {
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
    g.drawRect(app.screen.width / 2 - app.screen.width / 4 + 50, app.screen.height / 2, app.screen.width / 3, 40);
    g.endFill();
  }, []);

  return (
    <>
      <Graphics draw={draw} onClick={handleClick}/>

      {/* Make blinking cursor so users know they can type something... */}
      {showCursor && (
        <Text
          text= "|"
          x={(app.screen.width / 2) /1.54}
          y={app.screen.height / 2}
          style={{
            zIndex: 22,
            fontSize: 30,
            fill: 'black',
            fontWeight:"200"
          }
          
        }
        />
      )}
  {Text && (
        <Text
          text= {lastWord}
          x={(app.screen.width / 2) /1.54}
          y={app.screen.height / 2}
          style={{
            zIndex: 22,
            fontSize: 30,
            fill: 'black',
            fontWeight:"200"
          }
          
        }
        />
      )}


    </>
  );
}

function WordInputBox({ text, inputBoxRef }) {
  const app = useApp();
  const screenWidth = app.screen.width
  return (
    <Container>
      {!text && (
        <Text
          text="Type some of the things that are upsetting you so Bluey can help you destroy them."
          x={app.screen.width / 2 - app.screen.width / 4}
          y={app.screen.height / 5}
          style={{
            display: text ? 'none' : 'block',
            align: 'center',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize:screenWidth/200,
            fontWeight: '400',
            fill: ['#ffffff', '#00ff99'], // gradient
            strokeThickness: 0,
            letterSpacing: 2,
            wordWrap: true,
            wordWrapWidth: 400,
          }}
        />
      )}

      <InputArea text={text} inputBoxRef={inputBoxRef} />

      {text && (
        <>
          <Text
            text='Words to destroy:'
            x={app.screen.width / 2 - app.screen.width / 4}
            y={app.screen.height - app.screen.height / 1.3}
            style={{
              align: 'center',
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: screenWidth/700,
              fontWeight: '400',
              fill: ['#ff9d9d', '#ffe1e1'],
              stroke: '#01d27e',
              letterSpacing: 2,
              wordWrap: true,
              wordWrapWidth: 440,
            }}
          />
          <Text
            text={text}
            x={app.screen.width / 2 - app.screen.width / 4}
            y={app.screen.height - app.screen.height / 1.5}
            style={{
              align: 'center',
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 40,
              fontWeight: '400',
              fill: ['#ffffff', '#00ff99'], // gradient
              stroke: '#01d27e',
              letterSpacing: 2,
              wordWrap: true,
              wordWrapWidth: 440,
            }}
          />
        </>
      )}
    </Container>
  );
}

export default WordInputBox;

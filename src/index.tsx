import React, { useEffect, useCallback, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import classnames from "classnames";
import * as serviceWorker from "./serviceWorker";

const DEFAULT_COLOR = "rgb(61, 104, 146)";

const useAudio = (url: string) =>
  useMemo(() => {
    const audio = new Audio(url);
    audio.pause();
    audio.currentTime = 0;
    audio.src = url;
    return audio;
  }, [url]);

type SoundProps = {
  url: string;
  code?: string;
  title: string;
  collection?: string;
  accent?: string;
};
const Sound = ({ url, code, title, collection, accent }: SoundProps) => {
  const audio = useAudio(url);
  const [isPressed, setPressed] = useState(false);

  const stop = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;
    setPressed(false);
  }, [audio]);

  const play = useCallback(() => {
    stop();
    audio.play();
    setPressed(true);
  }, [audio, stop]);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.code === code && !e.repeat) {
        play();
      }
    };

    const keyupHandler = (e: KeyboardEvent) => {
      if (e.code === code) {
        stop();
      }
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    // cleanup
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [code, play, stop]);

  const key = (code || "").replace(/(Key|Digit)/, "");

  return (
    <div
      className={classnames("sound", isPressed && "sound--pressed")}
      onMouseDown={play}
      onMouseUp={stop}
      onTouchStart={play}
      onTouchEnd={stop}
      style={{ backgroundColor: accent || DEFAULT_COLOR }}
    >
      {key && <div className="sound__key">{key}</div>}
      <div className="sound__title">{title}</div>
      {collection && <div className="sound__collection">{collection}</div>}
    </div>
  );
};

const sounds = [
  [
    "Digit1",
    "Quero café",
    "https://www.myinstants.com/media/sounds/01-jamalicious.mp3"
  ],
  [
    "Digit2",
    "Isso aqui é uma porcaria",
    "https://www.myinstants.com/media/sounds/isso-aq-e_j0K5vAG.mp3"
  ],
  [
    "Digit3",
    "Que não merda nenhuma",
    "https://www.myinstants.com/media/sounds/merda_nenhuma_rPHmp25.mp3"
  ],
  [
    "Digit4",
    "Desculpe",
    "https://www.myinstants.com/media/sounds/desculpa_3vJrBEp.mp3"
  ],
  [
    "",
    "Desculpe",
    "https://www.myinstants.com/media/sounds/desculpa_3vJrBEp.mp3"
  ],
  [
    "Enter",
    "Desculpe",
    "https://www.myinstants.com/media/sounds/desculpa_3vJrBEp.mp3"
  ],
  [
    "Space",
    "Desculpe",
    "https://www.myinstants.com/media/sounds/desculpa_3vJrBEp.mp3"
  ],
  [
    "KeyJ",
    "Aqui é Jamal",
    "https://www.myinstants.com/media/sounds/aqui-e-jamal-ok.mp3",
    "brown"
  ]
];

const App = () => {
  return (
    <div className="board">
      {sounds.map(([code, title, url, accent], i) => (
        <Sound key={i} code={code} title={title} url={url} accent={accent} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const DEFAULT_COLOR = "rgb(61, 104, 146)";

const useAudio = (url: string) => {
  let audio = new Audio();
  useEffect(() => {
    audio.src = url;
    audio.pause();
    audio.currentTime = 0;
    audio.src = url;
  }, [url]);
  return audio;
};

type SoundProps = {
  url: string;
  code?: string;
  title: string;
  collection?: string;
  accent?: string;
};
const Sound = ({ url, code, title, collection, accent }: SoundProps) => {
  const audio = useAudio(url);

  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const play = () => {
    stop();
    audio.play();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === code) play();
    };
    window.addEventListener("keypress", handler);

    return () => window.removeEventListener("keypress", handler); // cleanup
  }, [code]);

  const key = (code || "").replace(/(Key|Digit)/, "");

  return (
    <div
      className="sound"
      onClick={play}
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

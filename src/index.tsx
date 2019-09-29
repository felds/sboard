import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const useAudio = (file: string) => {
  let audio = new Audio(file);
  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.src = file;
  }, [file]);
  return audio;
};

type SoundProps = {
  file: string;
};
const Sound = ({ file }: SoundProps) => {
  const tracks = ["chupa", "isso", "merda"].map(t => `audio/${t}.mp3`);

  const [progress, setProgress] = useState(0);
  const [track, setTrack] = useState(tracks[0]);
  const audio = useAudio(track);

  audio.ontimeupdate = () => {
    setProgress(audio.currentTime / audio.duration || 0);
  };
  audio.onended = () => {
    audio.currentTime = 0;
    // setProgress(0)
  };

  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
  };
  const play = () => {
    // stop();
    console.log(audio);
    audio.play();
  };

  return (
    <div>
      <button onClick={play}>▶️</button>
      <progress max={1} value={progress}></progress>
      <select onChange={e => setTrack(e.target.value)}>
        {tracks.map(t => (
          <option value={t} key={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Sboard</h1>
      <Sound file="audio/chupa.mp3" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

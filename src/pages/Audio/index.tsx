import { useState, useRef } from 'react';
import Button from 'components/Button';
import soundfile from 'assets/relax.mp3';

const audio = new Audio('./music/acoustic-motivation.mp3');
console.log('audio', audio);

export default function Player() {
  const [play, setPlay] = useState<boolean>(false);
  const audioTag = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    // audio.play();
    setPlay(true);
    if (audioTag.current) {
      console.log('audioTag.current', audioTag);
      await audioTag.current
        .play()
        .then((res) => {
          console.log('res', res);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  const handlePause = () => {
    setPlay(false);
    if (audioTag.current) {
      audioTag.current.pause();
    }
  };

  return (
    <div>
      video player
      <audio preload="" id="audio" src={soundfile} ref={audioTag}></audio>
      {play ? (
        <Button onClick={handlePause}>pause</Button>
      ) : (
        <Button onClick={handlePlay}>play</Button>
      )}
    </div>
  );
}

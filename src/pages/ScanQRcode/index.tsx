import { useMemo, useState } from 'react';
import Button from 'components/Button';
import { useEffect, useRef } from 'react';
import {
  QRCodeReader,
  BrowserMultiFormatReader,
  Result,
  Exception,
} from '@zxing/library';

export function ScanQRcode() {
  const [data, setData] = useState('No result');
  const ref = useRef(null);
  const videoRef = useRef(null);
  const controlRef = useRef<any>(null);

  const closeCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    stream.getTracks().forEach(function (track) {
      console.log(track, 'track');

      track.stop();
      track.enabled = false;
    });
    console.log(ref, 'ref');
    console.log(stream, 'stream');

    // ref.current.stopCamera()
  };

  return (
    <div>
      <h1>ScanQRcode</h1>
      <video
        style={{ maxWidth: '200px', maxHeight: '200px', height: '200px' }}
        ref={videoRef}
      />
      <p>scan result : {data}</p>
      <Button
        onClick={() => {
          const codeReader = new BrowserMultiFormatReader();
          // get video loading
          // const getLoading = setInterval(() => {
          // 	if (videoRef.current) {
          // 		const loading = codeReader.isVideoPlaying(
          // 			videoRef.current,
          // 		);
          // 		if (loading) {
          // 			clearInterval(getLoading);
          // 		}
          // 	}
          // }, 1000);
          console.log(codeReader, 'codeReader');
          codeReader.decodeFromVideoDevice(
            null,
            videoRef.current,
            (result: Result, error?: Exception) => {
              // use the result and error values to choose your actions
              // you can also use controls API in this scope like the controls
              // returned from the method.
              controlRef.current = codeReader;

              if (error) {
                return;
              }
              if (result) {
                // setData(result.text);
                console.log(result, 'result');
                setData(result.getText());

                codeReader.reset();
              }
              // controlRef.current = controls;
            }
          );
        }}
      >
        start
      </Button>
      <Button
        onClick={() => {
          console.log('stop');
          controlRef.current.reset();
        }}
      >
        stop
      </Button>
    </div>
  );
}

export default ScanQRcode;

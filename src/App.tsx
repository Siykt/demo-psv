import { useEffect, useRef, useState } from 'react';
import { Viewer } from 'photo-sphere-viewer';
import './App.css';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appRef.current) {
      const viewer = new Viewer({
        container: appRef.current,
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: true,
        panorama: 'http://filebed.xxlsjfx.com/win/2022-11-14-1668405547658.jpg',
      });
    }
  });

  return <div ref={appRef} className='App'></div>;
}

export default App;

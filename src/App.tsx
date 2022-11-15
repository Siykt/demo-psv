import { useEffect, useRef, useState } from 'react';
import { Viewer } from 'photo-sphere-viewer';
import { GalleryPlugin } from 'photo-sphere-viewer/dist/plugins/gallery';
import './App.css';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import 'photo-sphere-viewer/dist/plugins/gallery.css';
import { TAB_DATA_MAPS, ZH_CN_LANG } from './constants';
import { useTitle } from 'react-use';

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [VRId, setVRId] = useState(new URL(window.location.href).searchParams.get('VRId') ?? 'lssy');
  const [title, setTitle] = useState('Loading...');

  useTitle(title);

  useEffect(() => {
    if (!appRef.current) return;
    const tabData = TAB_DATA_MAPS[VRId];
    if (!tabData) return;

    let viewer = viewerRef.current;
    if (!viewer) {
      viewer = new Viewer({
        container: appRef.current,
        touchmoveTwoFingers: true,
        plugins: [[GalleryPlugin, {}]],
        mousewheelCtrlKey: true,
        panorama: tabData.assets[0],
        lang: ZH_CN_LANG,
      });
      viewerRef.current = viewer;
    }
    const gp = viewer.getPlugin(GalleryPlugin);
    if (!gp) return;
    gp.setItems(
      tabData.assets.map((panorama, index) => ({
        id: `${VRId}-${index}`,
        panorama,
        name: `${tabData.name}-${index + 1}`,
      }))
    );
    setTitle(tabData.name);
  }, [VRId]);

  return <div ref={appRef} className='App'></div>;
}

export default App;

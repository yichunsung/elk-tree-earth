import { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const defaultOption = {
  width: 1280,
  height: 720,
  antialias: true,
  transparent: false,
  backgroundColor: 0x000000,
};

function Pixi() {

  const [app, setApp] = useState(null);

  const cvs = useRef();

  useEffect(() => {
    main();
  }, []);

  const main = () => {
    const newApp = new PIXI.Application({
      view: cvs.current,
      ...defaultOption
    });
    newApp.renderer.autoResize = true; // 確保寬度及高度正確而使用的屬性
    newApp.renderer.resize(window.innerWidth, window.innerHeight);
    setApp(newApp);

    const newContainer = new PIXI.Container();
    newApp.stage.addChild(newContainer);
    // const PIXIText = new PIXI.Text('這是一段話');
    const role = PIXI.Sprite.from('https://cdnb.artstation.com/p/assets/images/images/000/741/959/large/tyler-ryan-recon016.jpg?1474548194');
    role.anchor.set(0.3);
    role.x = newApp.screen.width / 3;
    role.y = newApp.screen.height / 2;
    newContainer.addChild(role);
  }

  const changeBackground = () => {
    console.log(app.stage);
    app.renderer.backgroundColor = app.renderer.backgroundColor === 0 ? 0x00CC99 : 0x000000;
  }

  return (
    <main>
      <canvas ref={ cvs }></canvas>
      <section>
        <button onClick={ () => { changeBackground() } }>Click</button>
      </section>
    </main>
  )
}

export default Pixi;

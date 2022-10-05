import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { FPV } from "./components/FPV";
import { Cubes } from "./components/Cubes";
import { TextureSelector } from "./components/TextureSelector";
import "./index.css";
import { Menu } from "./components/Menu";

function App() {
  return (
    <>
      <Canvas>
        {/* sunPosition set the sun in the sky and take an array of x,y,z for location */}
        <Sky sunPosition={[100, 100, 20]} />
        {/* ambientLight will light up every 3d surface */}
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div className="absolute centered cursor">+</div>
      <TextureSelector />
      <Menu />
    </>
  );
}

export default App;
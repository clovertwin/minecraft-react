import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

export const Ground = () => {
  // rotate x axis to tilt gound pi/2=90deg
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const addCube = useStore((state) => state.addCube);

  // how many times the texture is repeated in both U direction and V direction
  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((value) =>
          Math.ceil(value)
        );
        addCube(x, y, z);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

// Setting up first person view
export const FPV = () => {
  const { camera, gl } = useThree();

  return <PointerLockControls args={[camera, gl.domElement]} />;
};

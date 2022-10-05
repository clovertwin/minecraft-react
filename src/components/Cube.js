import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";
import { useStore } from "../hooks/useStore";
import { useState } from "react";

export const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const { addCube, removeCube } = useStore((state) => state);

  const activeTexture = textures[texture + "Texture"];

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (e.shiftKey) {
          removeCube(x, y, z);
          return;
        }
        if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        }
        if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        }
        if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        }
        if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        }
        if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        }
        if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "lightgrey" : "white"}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        map={activeTexture}
        attach="material"
      />
    </mesh>
  );
};

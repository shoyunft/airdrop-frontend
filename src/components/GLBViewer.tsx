import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";

const GLBViewer = ({ url, width, height }) => {
  return (
    <GLTFModel
      src={url}
      width={width}
      height={height}
      rotation={{ x: -0.008, y: 0.49, z: 0.005 }}
      position={{ x: 0.7, y: 0.2, z: 1.3 }}
    >
      <AmbientLight color={0xffffff} />
      <DirectionLight color={0xffffff} position={{ x: -20, y: 10, z: 40 }} />
      <DirectionLight color={0xffffff} position={{ x: -20, y: 30, z: 40 }} />
      <DirectionLight color={0xffffff} position={{ x: 20, y: 20, z: 40 }} />
      <DirectionLight color={0xffffff} position={{ x: 20, y: 30, z: 40 }} />
      <DirectionLight color={0xffffff} position={{ x: -20, y: 100, z: -40 }} />
    </GLTFModel>
  );
};

export default GLBViewer;

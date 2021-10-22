import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";

const GLBViewer = ({ url, width, height }) => {
  return (
    <GLTFModel
      src={url}
      width={width}
      height={height}
      rotation={{ x: -0.1, y: 0.22, z: 0.02 }}
      position={{ x: 0.9, y: 0.5, z: 4 }}
    >
      <AmbientLight color={0xffffff} />
      <DirectionLight color={0xffffff} position={{ x: -20, y: 30, z: 40 }} />
      <DirectionLight color={0xffffff} position={{ x: 20, y: 30, z: 40 }} />
      <DirectionLight color={0xffffff} position={{ x: -20, y: 100, z: -40 }} />
    </GLTFModel>
  );
};

export default GLBViewer;

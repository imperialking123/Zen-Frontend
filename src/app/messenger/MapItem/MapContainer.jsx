import MapDivider from "./ui/MapDivider";
import MapImage from "./ui/MapImage";
import MapText from "./ui/MapText";

const MapContainer = ({ msg }) => {
  
  if (msg.type === "divider") return <MapDivider data={msg} />;

  if (msg.type === "text-msg") return <MapText  data={msg} />;

  if(msg.type  === 'image-msg' ) return <MapImage data={msg} />

  return null;
};

export default MapContainer;

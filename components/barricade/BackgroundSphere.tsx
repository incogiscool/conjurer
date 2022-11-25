type BackgroundSphereType = {
  className?: string;
};

const BackgroundSphere = ({ className }: BackgroundSphereType) => {
  return <div id="background-sphere" className={className} />;
};

export default BackgroundSphere;

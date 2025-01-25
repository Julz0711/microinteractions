import DynamicIcon from "./dynamicIcon";

const deviceBox = () => {
  return (
    <div className="flex-center gap-300 px-400 py-500 bg-light shadow-active rounded-sm">
      <DynamicIcon iconName="FaLightbulb" />
      test
    </div>
  );
};

export default deviceBox;

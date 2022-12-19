type ToolTipType = {
  tooltip: string;
};

const ToolTip = ({ tooltip }: ToolTipType) => {
  return (
    <div className="bg-tooltipBackground border border-white pl-4 pr-4 p-2 text-white rounded-lg shadow-lg text-sm font-medium">
      {tooltip}
    </div>
  );
};

export default ToolTip;

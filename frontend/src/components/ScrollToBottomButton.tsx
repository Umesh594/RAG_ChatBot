import { ArrowDown } from "lucide-react";

interface Props {
  onClick: () => void;
  visible: boolean;
}

export const ScrollToBottomButton = ({ onClick, visible }: Props) => {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="scroll-btn"
    >
      <ArrowDown className="w-5 h-5" />
    </button>
  );
};

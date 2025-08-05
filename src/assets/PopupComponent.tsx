import React from "react";

interface PopupProps {
  isVisible: boolean;
  body: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  onClose?: () => void;
}

const PopupComponent: React.FC<PopupProps> = ({
  isVisible,
  body,
  primaryButtonText = "CONTINUAR",
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Popup */}
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-10 relative shadow-service">
        {/* Message */}
        <div className="text-center text-gray-700 mb-6 text-lg">{body}</div>

        {/* Primary Button */}
        <button
          className="w-full py-4 px-6 bg-[#ff8f45] text-white rounded-md text-lg font-medium mb-3 hover:bg-[#e67e35] transition-colors"
          onClick={() => {
            onPrimaryButtonClick && onPrimaryButtonClick();
            onClose && onClose();
          }}
        >
          {primaryButtonText}
        </button>

        {/* Secondary Button (optional) */}
        {secondaryButtonText && (
          <button
            className="w-full py-4 px-6 bg-[#FFF2F2] text-[#ff8f45] rounded-md text-lg font-medium hover:bg-[#FFE5E5] transition-colors"
            onClick={() => {
              onSecondaryButtonClick && onSecondaryButtonClick();
              onClose && onClose();
            }}
          >
            {secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PopupComponent;

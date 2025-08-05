// Modal Event Manager - A global manager for modal/popup events
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PopupProps {
  isVisible?: boolean;
  showModal?: boolean;
  body?: string;
  title?: string;
  icon?: string;
  modalIcon?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  buttonText1?: string;
  buttonText2?: string;
  showButton1?: boolean;
  showButton2?: boolean;
  modalTitle?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  onButtonClick1?: () => void;
  onButtonClick2?: () => void;
  onClose?: () => void;
  children?: React.ReactNode | (() => React.ReactNode);
  modalBody?: React.ReactNode;
  primaryButtonBgColor?: string;
  primaryButtonTextColor?: string;
  secondaryButtonBgColor?: string;
  secondaryButtonTextColor?: string;
}

class ModalEventManager {
  private static instance: ModalEventManager;

  private constructor() {}

  public static getInstance(): ModalEventManager {
    if (!ModalEventManager.instance) {
      ModalEventManager.instance = new ModalEventManager();
    }
    return ModalEventManager.instance;
  }

  public showPopup(popupProps: PopupProps): void {
    try {
      if (typeof window !== "undefined" && window.document) {
        // If React components are provided, use React rendering
        if (popupProps.children || popupProps.modalBody) {
          this.showReactPopup(popupProps);
        } else {
          this.createAndShowPopup(popupProps);
        }
      } else {
        console.log("Would show popup with:", popupProps);
        if (typeof alert === "function") {
          if (typeof popupProps.body === "string") {
            alert(popupProps.body || "Popup would show here");
          } else {
            alert("Popup would show here");
          }
        }
      }
    } catch (err) {
      console.error("Error showing popup:", err);
      try {
        if (typeof popupProps.body === "string") {
          alert(popupProps.body || "Popup would show here");
        } else {
          alert("Popup would show here");
        }
      } catch (e) {
        console.error("Alert fallback also failed");
      }
    }
  }

  private createAndShowPopup(popupProps: PopupProps): void {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container-" + Date.now();
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "0";
    popupContainer.style.left = "0";
    popupContainer.style.width = "100%";
    popupContainer.style.height = "100%";
    popupContainer.style.display = "flex";
    popupContainer.style.alignItems = "center";
    popupContainer.style.justifyContent = "center";
    popupContainer.style.zIndex = "9999";

    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    // Create popup content
    const content = document.createElement("div");
    content.style.backgroundColor = "white";
    content.style.borderRadius = "20px";
    content.style.padding = "2.5rem";
    content.style.maxWidth = "500px";
    content.style.margin = "0 auto";
    content.style.position = "relative";
    content.style.zIndex = "10";
    content.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

    // Icon if provided
    if (popupProps.icon || popupProps.modalIcon) {
      const iconContainer = document.createElement("div");
      iconContainer.style.textAlign = "center";
      iconContainer.style.marginBottom = "16px";

      const icon = document.createElement("img");
      icon.src = popupProps.icon || popupProps.modalIcon || "";
      icon.style.width = "75px";
      icon.style.height = "75px";

      iconContainer.appendChild(icon);
      content.appendChild(iconContainer);
    }

    // Title if provided
    if (popupProps.title || popupProps.modalTitle) {
      const title = document.createElement("div");
      title.style.textAlign = "center";
      title.style.color = "#333";
      title.style.fontWeight = "bold";
      title.style.marginBottom = "16px";
      title.style.fontSize = "16px";
      title.textContent = popupProps.title || popupProps.modalTitle || "";
      content.appendChild(title);
    }

    // Message
    const message = document.createElement("div");
    message.style.textAlign = "center";
    message.style.color = "#333";
    message.style.marginBottom = "24px";
    message.style.fontSize = "13.33px";

    if (typeof popupProps.body === "string") {
      message.textContent = popupProps.body || "";
    }

    // Primary button
    const primaryButton = document.createElement("button");
    primaryButton.style.width = "100%";
    primaryButton.style.padding = "12px 24px";
    primaryButton.style.backgroundColor = popupProps.primaryButtonBgColor || "#ff8f45";
    primaryButton.style.color = popupProps.primaryButtonTextColor || "white";
    primaryButton.style.border = "none";
    primaryButton.style.borderRadius = "10px";
    primaryButton.style.fontSize = "16px";
    primaryButton.style.marginBottom = "12px";
    primaryButton.style.cursor = "pointer";
    primaryButton.textContent = popupProps.primaryButtonText || "CONTINUAR";

    const closePopup = () => {
      if (popupContainer && popupContainer.parentNode) {
        popupContainer.parentNode.removeChild(popupContainer);
      }
    };

    primaryButton.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      if (popupProps.onPrimaryButtonClick) popupProps.onPrimaryButtonClick();
      closePopup();
    };

    content.appendChild(message);

    const showPrimaryButton =
      popupProps.showPrimaryButton !== false &&
      popupProps.showButton1 !== false;

    if (showPrimaryButton) {
      content.appendChild(primaryButton);
    }

    const showSecondaryButton =
      (popupProps.secondaryButtonText || popupProps.buttonText2) &&
      popupProps.showSecondaryButton !== false &&
      popupProps.showButton2 !== false;

    if (showSecondaryButton) {
      const secondaryButton = document.createElement("button");
      secondaryButton.style.width = "100%";
      secondaryButton.style.padding = "12px 24px";
      secondaryButton.style.backgroundColor = popupProps.secondaryButtonBgColor || "#fef1ec";
      secondaryButton.style.color = popupProps.secondaryButtonTextColor || "#ff8f45";
      secondaryButton.style.border = "none";
      secondaryButton.style.borderRadius = "10px";
      secondaryButton.style.fontSize = "16px";
      secondaryButton.style.cursor = "pointer";
      secondaryButton.textContent =
        popupProps.secondaryButtonText || popupProps.buttonText2 || "CANCEL";

      secondaryButton.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (popupProps.onSecondaryButtonClick)
          popupProps.onSecondaryButtonClick();
        else if (popupProps.onButtonClick2) popupProps.onButtonClick2();
        closePopup();
      };

      content.appendChild(secondaryButton);
    }

    overlay.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      closePopup();
    };

    popupContainer.appendChild(overlay);
    popupContainer.appendChild(content);

    document.body.appendChild(popupContainer);
  }

  public showModal(modalProps: PopupProps): void {
    this.showPopup(modalProps);
  }

  private showReactPopup(popupProps: PopupProps): void {
    console.warn(
      "React popup implementation not fully supported in this environment.",
    );

    // Use basic DOM for now
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container-" + Date.now();
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "0";
    popupContainer.style.left = "0";
    popupContainer.style.width = "100%";
    popupContainer.style.height = "100%";
    popupContainer.style.display = "flex";
    popupContainer.style.alignItems = "center";
    popupContainer.style.justifyContent = "center";
    popupContainer.style.zIndex = "9999";

    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    // Create popup content
    const content = document.createElement("div");
    content.style.backgroundColor = "white";
    content.style.borderRadius = "20px";
    content.style.padding = "2.5rem";
    content.style.maxWidth = "500px";
    content.style.margin = "0 auto";
    content.style.position = "relative";
    content.style.zIndex = "10";
    content.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

    const closePopup = () => {
      if (popupContainer && popupContainer.parentNode) {
        popupContainer.parentNode.removeChild(popupContainer);
      }
    };

    // Add icon if available
    if (popupProps.icon || popupProps.modalIcon) {
      const iconContainer = document.createElement("div");
      iconContainer.style.textAlign = "center";
      iconContainer.style.marginBottom = "16px";

      const icon = document.createElement("img");
      icon.src = popupProps.icon || popupProps.modalIcon || "";
      icon.style.width = "75px";
      icon.style.height = "75px";

      iconContainer.appendChild(icon);
      content.appendChild(iconContainer);
    }

    // Add title if available
    if (popupProps.title || popupProps.modalTitle) {
      const title = document.createElement("div");
      title.style.textAlign = "center";
      title.style.color = "#333";
      title.style.fontWeight = "bold";
      title.style.marginBottom = "16px";
      title.style.fontSize = "16px";
      title.textContent = popupProps.title || popupProps.modalTitle || "";
      content.appendChild(title);
    }

    // Create a container for React components
    const reactContainer = document.createElement("div");
    reactContainer.style.textAlign = "center";
    reactContainer.style.color = "#333";
    reactContainer.style.marginBottom = "24px";
    reactContainer.style.fontSize = "13.33px";
    content.appendChild(reactContainer);

    // Render React components into the container
    try {
      if (popupProps.children || popupProps.modalBody) {
        // Determine which React content to render
        const reactContent = popupProps.children || popupProps.modalBody;

        // Use React DOM rendering API
        // @ts-ignore - Ignoring TypeScript error since ReactDOM.render exists at runtime
        ReactDOM.render(reactContent, reactContainer);
      } else {
        // Fallback message if no React components are provided
        reactContainer.textContent =
          popupProps.body || "Popup content would show here";
      }
    } catch (error) {
      console.error("Error rendering React component:", error);
      reactContainer.textContent = "Error rendering React component";
    }

    const showPrimaryButton =
      popupProps.showPrimaryButton !== false &&
      popupProps.showButton1 !== false;

    if (showPrimaryButton) {
      const primaryButton = document.createElement("button");
      primaryButton.style.width = "100%";
      primaryButton.style.padding = "12px 24px";
      primaryButton.style.backgroundColor = popupProps.primaryButtonBgColor || "#ff8f45";
      primaryButton.style.color = popupProps.primaryButtonTextColor || "white";
      primaryButton.style.border = "none";
      primaryButton.style.borderRadius = "10px";
      primaryButton.style.fontSize = "16px";
      primaryButton.style.marginBottom = "12px";
      primaryButton.style.cursor = "pointer";
      primaryButton.textContent =
        popupProps.primaryButtonText || popupProps.buttonText1 || "CONTINUAR";

      primaryButton.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (popupProps.onPrimaryButtonClick) popupProps.onPrimaryButtonClick();
        else if (popupProps.onButtonClick1) popupProps.onButtonClick1();
        closePopup();
      };

      content.appendChild(primaryButton);
    }

    const showSecondaryButton =
      (popupProps.secondaryButtonText || popupProps.buttonText2) &&
      popupProps.showSecondaryButton !== false &&
      popupProps.showButton2 !== false;

    if (showSecondaryButton) {
      const secondaryButton = document.createElement("button");
      secondaryButton.style.width = "100%";
      secondaryButton.style.padding = "12px 24px";
      secondaryButton.style.backgroundColor = popupProps.secondaryButtonBgColor || "#fef1ec";
      secondaryButton.style.color = popupProps.secondaryButtonTextColor || "#ff8f45";
      secondaryButton.style.border = "none";
      secondaryButton.style.borderRadius = "10px";
      secondaryButton.style.fontSize = "16px";
      secondaryButton.style.cursor = "pointer";
      secondaryButton.textContent =
        popupProps.secondaryButtonText || popupProps.buttonText2 || "CANCEL";

      secondaryButton.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (popupProps.onSecondaryButtonClick)
          popupProps.onSecondaryButtonClick();
        else if (popupProps.onButtonClick2) popupProps.onButtonClick2();
        closePopup();
      };

      content.appendChild(secondaryButton);
    }

    // Allow closing by clicking overlay
    overlay.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      closePopup();
    };

    // Assemble and add to body
    popupContainer.appendChild(overlay);
    popupContainer.appendChild(content);

    // Add to document body
    document.body.appendChild(popupContainer);
  }
}

export default ModalEventManager.getInstance();

import OBR from "https://cdn.skypack.dev/@owlbear-rodeo/sdk";

export function createAndShowPopover(parentTarget, content) {
  OBR.onReady(() => {
    // 1. Create a "popover" element (a div that looks like a popover)
    const popover = document.createElement('div');
    popover.classList.add('custom-popover'); // Add a CSS class for styling

    // 2. Set the content of the "popover"
    popover.innerHTML = content;

    // 3. Position the "popover" relative to the parentTarget
    // (You'll need to calculate this position based on parentTarget's location)
    const parentRect = parentTarget.getBoundingClientRect();
    popover.style.left = `${parentRect.right + 10}px`; // Example: Position to the right
    popover.style.top = `${parentRect.top}px`;

    // 4. Add the "popover" to the page
    document.body.appendChild(popover); // Or to a specific container

    // 5. Add a close button or mechanism (optional)
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      popover.remove();
    });
    popover.appendChild(closeButton);

    return popover; // Return the created popover element
  });
}
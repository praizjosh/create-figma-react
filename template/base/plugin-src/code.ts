// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

try {
  const uiOptions = { height: 650, title: "", width: 500 };
  switch (figma.editorType) {
    case "figma":
      uiOptions.title = "My Figma Plugin!";
      figma.notify("Running in Figma Plugin environment");

      // Calls to "parent.postMessage" from within the HTML page will trigger this
      // callback. The callback will be passed the "pluginMessage" property of the posted message.
      figma.ui.onmessage = (msg) => {
        if (msg.type === "create-rectangles") {
          const nodes: SceneNode[] = [];
          for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
          }
          figma.currentPage.selection = nodes;
          figma.viewport.scrollAndZoomIntoView(nodes);
        }

        // Make sure to close the plugin when you're done. Otherwise the plugin will
        // keep running, which shows the cancel button at the bottom of the screen.
        if (msg.type === "cancel") {
          figma.closePlugin();
        }
      };
      break;
    case "dev":
      uiOptions.title = "My Figma Dev Plugin!";
      figma.notify("Running in Figma Dev environment");
      break;
    case "figjam":
      uiOptions.title = "My FigJam Plugin!";
      figma.notify("Running in FigJam environment");
      break;
    case "slides":
      uiOptions.title = "My Figma Slides Plugin!";
      figma.notify("Running in Figma Slides environment");
      break;
    default:
      figma.notify(`Unhandled editor type: ${figma.editorType}`);
      uiOptions.title = "Figma Plugin";
  }

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__, uiOptions);
  figma.ui.resize(uiOptions.width, uiOptions.height);
} catch (error) {
  figma.notify(`An error occurred while executing task: ${error}`);
}

try {
    const uiOptions = { height: 650, title: "", width: 500 };
    switch (figma.editorType) {
        case "dev":
            uiOptions.title = "My Figma Dev Plugin!";
            figma.notify("Running in Figma Dev environment");
            break;
        case "figma":
            uiOptions.title = "My Figma Plugin!";
            figma.notify("Running in Figma Plugin environment");
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

    figma.showUI(__html__, uiOptions);
    figma.ui.resize(uiOptions.width, uiOptions.height);
} catch (error) {
    figma.notify(`An error occurred while executing task: ${error}`);
}

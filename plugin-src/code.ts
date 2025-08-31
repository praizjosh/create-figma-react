figma.showUI(__html__);
figma.ui.resize(500, 650);

figma.ui.onmessage = async (message) => {
    try {
        switch (figma.editorType) {
            case "figma":
                figma.showUI(__html__, {
                    title: "My Figma Plugin!",
                });
                break;

            case "figjam":
                figma.showUI(__html__, {
                    title: "My FigJam  Plugin!",
                });
                break;

            case "slides":
                figma.showUI(__html__, {
                    title: "My Figma Slides Plugin!",
                });
                break;

            default:
                figma.notify(`Unhandled request. Message type does not exist: ${message.type}`);
        }
    } catch (error) {
        figma.notify(`An error occurred while executing task: ${error}`);
    }
};

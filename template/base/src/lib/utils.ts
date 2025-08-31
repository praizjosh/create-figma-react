/**
 * Sends a message to the Figma UI.
 *
 * @param {string} type - The type of the message.
 * @param {unknown} data - The data to be sent with the message.
 */
export function postMessageToUI(type: string, data: unknown) {
  figma.ui.postMessage({ type, data });
}

/**
 * Sends a message to the backend using the Figma plugin API.
 *
 * @param type - The type of the message to be sent.
 * @param payload - An optional object containing additional data to be sent with the message.
 */
export function postMessageToBackend(type: string, payload: Record<string, unknown> = {}) {
  parent.postMessage({ pluginMessage: { type, ...payload } }, "*");
}

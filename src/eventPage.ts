// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener(() => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    return isResponseAsync;
});

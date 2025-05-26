chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);
    if (message.type === "open-ide") {
        const port = chrome.runtime.connectNative("com.ide_launcher");
        port.postMessage({ ide: message.ide, repo: message.repo, issueId: message.issueId });
        port.onMessage.addListener(response => {
            console.log("Received from native app:", response);
        });
        port.onDisconnect.addListener(() => {
            if (chrome.runtime.lastError) {
                console.error("Native host error:", chrome.runtime.lastError.message);
            }
        });
    }
});

// PLAYDOGS Studio - MetaMask Web3 Integration

// Expose userAddress to window context
window.userAddress = null;

window.addEventListener("DOMContentLoaded", () => {
    const connectBtn = document.getElementById("wallet-connect-btn");
    const btnText = document.getElementById("wallet-btn-text");

    if (!connectBtn) return;

    // Check if MetaMask is already connected
    checkConnection();

    // Attach click listener
    connectBtn.addEventListener("click", async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                window.userAddress = accounts[0];
                updateUIConnected(window.userAddress);
                
                // Play retro chiptune sound if defined
                if (typeof playBeep === "function") {
                    playBeep(660, 0.1, "sine");
                    setTimeout(() => playBeep(880, 0.1, "sine"), 60);
                } else {
                    // Fallback to local audio context sound
                    playLocalChime();
                }
            } catch (error) {
                console.error("User denied wallet connection", error);
                alert("Wallet connection requested was denied. Please approve connection to adopt companions.");
            }
        } else {
            // MetaMask not installed, open download link
            window.open("https://metamask.io/download/", "_blank");
        }
    });

    // Listen for account switching
    if (typeof window.ethereum !== "undefined") {
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                window.userAddress = accounts[0];
                updateUIConnected(window.userAddress);
            } else {
                window.userAddress = null;
                updateUIDisconnected();
            }
        });

        window.ethereum.on("chainChanged", () => {
            window.location.reload();
        });
    }

    async function checkConnection() {
        if (typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    window.userAddress = accounts[0];
                    updateUIConnected(window.userAddress);
                }
            } catch (err) {
                console.error("Error checking connection status", err);
            }
        }
    }

    function updateUIConnected(address) {
        const shortAddress = address.slice(0, 6) + "..." + address.slice(-4);
        btnText.textContent = shortAddress.toUpperCase();
        connectBtn.style.background = "linear-gradient(135deg, var(--neon-cyan), #00b4d8)";
        connectBtn.style.color = "#050311";
        connectBtn.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.4)";
        connectBtn.title = `Connected: ${address}`;
    }

    function updateUIDisconnected() {
        btnText.textContent = "CONNECT METAMASK";
        connectBtn.style.background = ""; // Reset to styles.css default gradient
        connectBtn.style.color = "";
        connectBtn.style.boxShadow = "";
        connectBtn.title = "Connect your MetaMask Wallet";
    }

    // Audio helper in case main page context hasn't loaded yet
    function playLocalChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = 660;
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch(e) {}
    }
});

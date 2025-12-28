// AdSpace Widget - Vanilla JavaScript Implementation
// This widget fetches and displays ads from the AdSpace smart contract

(function () {
  "use strict";

  // Wait for config to be loaded
  if (typeof ADSPACE_CONFIG === "undefined") {
    console.error(
      "AdSpace Config not found. Make sure adspace-config.js is loaded before adspace-widget.js"
    );
    return;
  }

  const CONTRACT_ADDRESS = ADSPACE_CONFIG.CONTRACT_ADDRESS;
  const RPC_ENDPOINT = ADSPACE_CONFIG.RPC_ENDPOINT;
  const IPFS_GATEWAY = ADSPACE_CONFIG.IPFS_GATEWAY;
  const REFRESH_INTERVAL = ADSPACE_CONFIG.REFRESH_INTERVAL;

  // Contract ABI for getActiveAdImage function
  const CONTRACT_ABI = [
    {
      inputs: [{ internalType: "uint256", name: "spaceId", type: "uint256" }],
      name: "getActiveAdImage",
      outputs: [
        { internalType: "string", name: "imageLink", type: "string" },
        { internalType: "string", name: "advertiserSiteLink", type: "string" },
        { internalType: "uint256", name: "campaignId", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  /**
   * Convert IPFS link to HTTP gateway URL
   */
  function convertIPFS(ipfsLink) {
    if (!ipfsLink) return "";
    if (ipfsLink.startsWith("http")) return ipfsLink;
    const hash = ipfsLink.startsWith("ipfs://")
      ? ipfsLink.replace("ipfs://", "")
      : ipfsLink;
    return IPFS_GATEWAY + hash;
  }

  /**
   * Fetch and display ad for a specific container
   */
  async function fetchAd(containerId, spaceId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`AdSpace Widget: Container ${containerId} not found`);
      return;
    }

    if (!window.ethers) {
      container.innerHTML =
        '<div class="adspace-loading">Loading ad library...</div>';
      setTimeout(() => fetchAd(containerId, spaceId), 500);
      return;
    }

    try {
      container.innerHTML = '<div class="adspace-loading">Loading ad...</div>';

      const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const result = await contract.getActiveAdImage(spaceId);
      const campaignId = result[2].toString();

      if (campaignId !== "0" && campaignId !== "0x0") {
        const imageUrl = convertIPFS(result[0]);
        const advertiserLink = result[1];

        container.innerHTML = `
          <a href="${advertiserLink}" target="_blank" rel="noopener noreferrer" class="adspace-link">
            <img src="${imageUrl}" 
                 alt="Advertisement" 
                 class="adspace-image">
          </a>
        `;

        // Add error handler using JavaScript (not inline) to avoid CSP issues
        const img = container.querySelector(".adspace-image");
        if (img) {
          img.addEventListener("error", function () {
            // Fallback to ipfs.io if cloudflare fails
            if (this.src.includes("cloudflare-ipfs.com")) {
              this.src = this.src.replace("cloudflare-ipfs.com", "ipfs.io");
            } else if (this.src.includes("ipfs.io")) {
              // Try gateway.pinata.cloud as second fallback
              const hash = this.src.split("/ipfs/")[1];
              if (hash) {
                this.src = `https://gateway.pinata.cloud/ipfs/${hash}`;
              }
            }
          });
        }
      } else {
        container.innerHTML =
          '<div class="adspace-empty">No active campaign</div>';
      }
    } catch (err) {
      console.error("AdSpace Widget Error:", err);
      if (err.code === "CALL_EXCEPTION") {
        container.innerHTML =
          '<div class="adspace-empty">No active campaign</div>';
      } else {
        container.innerHTML =
          '<div class="adspace-error">⚠️ Failed to load ad</div>';
      }
    }
  }

  /**
   * Initialize the ad widget
   */
  function initAdWidgets() {
    // Wait for ethers.js to be available
    if (!window.ethers) {
      setTimeout(initAdWidgets, 200);
      return;
    }

    const containerId = "adspace-banner";
    const spaceId = ADSPACE_CONFIG.SPACE_ID;

    if (spaceId) {
      // Fetch ad immediately
      fetchAd(containerId, spaceId);

      // Set up refresh interval
      if (REFRESH_INTERVAL > 0) {
        setInterval(() => fetchAd(containerId, spaceId), REFRESH_INTERVAL);
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdWidgets);
  } else {
    initAdWidgets();
  }
})();

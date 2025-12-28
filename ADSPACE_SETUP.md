# AdSpace Widget Integration Guide

This landing page is integrated with **AdSpace.fun** to display ads from the blockchain-based advertising platform.

## Quick Setup

### Step 1: Get Your Space ID from AdSpace.fun

1. Go to [https://adspace.fun](https://adspace.fun/)
2. Connect your wallet and access the Dashboard
3. Navigate to **"My Spaces"** or **"Publisher Dashboard"**
4. Click **"Create New Ad Space"** and fill in:
   - **Ad Space Name** (e.g., "Homepage Banner")
   - **Dimensions** (e.g., 728x90, 300x250, 300x600)
   - **Price Per Hour** (in ETH)
   - **Site Link** (your website URL)
   - **Instalments** (number of payment instalments)
   - **Default Ad Link** (fallback URL)
5. **Note your Space ID** - it will be displayed after creation

### Step 2: Configure Space ID

Open `adspace-config.js` and update the Space ID:

```javascript
SPACE_ID: 3, // Replace with your Space ID from adspace.fun dashboard
```

**Note:** Just update the single `SPACE_ID` value with your actual Space ID.

### Step 3: Test the Integration

1. Start your local server:
   ```bash
   npm start
   # or
   npx http-server -p 8000
   ```

2. Open http://localhost:8000 in your browser

3. Check the browser console for any errors

4. The ad widget should display:
   - **Banner Ad** - After the hero section

## Ad Placement Location

The landing page has **1 ad placement location**:

**Banner Ad** (`adspace-banner`)
- Location: After hero section, before filters
- Recommended size: 728x90 (Leaderboard) or 300x250 (Medium Rectangle)
- Max width: 728px

## Configuration Options

Edit `adspace-config.js` to customize:

- **REFRESH_INTERVAL**: How often to refresh ads (default: 30000ms = 30 seconds)
- **IPFS_GATEWAY**: IPFS gateway URL (default: Cloudflare)
- **RPC_ENDPOINT**: Ethereum RPC endpoint (default: Alchemy Sepolia)

## Troubleshooting

### Ads Not Showing?

1. **Check Space ID**: Make sure your Space ID is correct in `adspace-config.js`
2. **Check Browser Console**: Open DevTools (F12) and check for errors
3. **Verify Ad Space Status**: Ensure your ad space is **Active** on adspace.fun
4. **Check Campaign**: Make sure there's an active campaign for your ad space
5. **Network Issues**: Check if you can access the RPC endpoint and IPFS gateway

### Common Errors

- **"No active campaign"**: No advertiser has purchased your ad space yet
- **"Failed to load ad"**: Check RPC endpoint connectivity or contract address
- **"Loading ad library..."**: Ethers.js library not loaded - check script order

### Testing Without Active Campaigns

If you don't have an active campaign, the widget will display "No active campaign" message. This is normal and expected behavior.

## File Structure

```
RealEstate/
├── index.html              # Main HTML (includes ad containers)
├── adspace-config.js       # Configuration file (UPDATE SPACE IDs HERE)
├── adspace-widget.js       # Widget implementation
├── styles.css              # Includes ad container styles
└── ADSPACE_SETUP.md        # This file
```

## Next Steps

1. Create an ad space on [adspace.fun](https://adspace.fun/)
2. Update Space ID in `adspace-config.js`
3. Test locally
4. Deploy to your hosting platform
5. Monitor ad performance in the AdSpace dashboard

## Support

For issues with:
- **AdSpace Platform**: Visit [adspace.fun](https://adspace.fun/) or check their documentation
- **Widget Integration**: Check browser console for errors and verify configuration


# Full-Stack app that uses real price data (DefiLlama) to show crypto assets in user's Wallet and more details on each asset

## The following tech stack is used:
 - React
 - Typescript
 - Node
 - Express
 - Tailwind
 - Styled-Components

 ## To start the app:
 1. Install node-modules by running 'npm i' in **both** the 'root' and the '/client' folders
 2. **From the root folder** run the following scripts: "npm run server" and in the separate tab run "npm run client"

 ## App Features
 - The Express backend requests data from the JSON file and the DefiLlama API
 - While the data is fetching on the /wallet page, a skeleton loader shows 
 - On the '/wallet' page (the home page) the Price data is being fetched and the Assets are listed based on their total value in a descending order
 - Each Asset in the list displays a symbol name, a current real price, a total value (across all chains), and a total amount of tokens data
 - Prices are displayed with respect to the number of decimals required
 - Scientific numbers are rounded and converted to be mathematically correct
 - If the real price of an asset is not available on DefiLlama, the price it is displayed as a 'N/A'
 - Those assets, if clicked on, would trigger an animated warning in the top right corner
 - Those assets that do have a real price data from DefiLlama, get opened up in a separate page
 - Each Asset page has a Total Asset value value calculated using the price data from the API
 - OpenPnL data calculated based on the delta between the current price and the purchase price, and shown in percentiles 
 - Further, each asset page contains a list (if there are multiple i.e. ETH) of asset chains. Each contains the info on Chain name, asset name, balance on that chain, and total value held on that chain. Note, that if the purchase price was 0 (ie token drop happened (i.e. GEAR)) the OpenPnL would show "^MAX"
 - The asset icons on each page are lazy loaded and animated.


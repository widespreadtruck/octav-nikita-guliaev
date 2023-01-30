# This is a Full-Stack app that uses the following tech stack:
 - React
 - Typescript
 - Node
 - Express
 - Tailwind
 - Styled-Components

 ## To start the app:
 1. Install node-modules by running 'npm i' in *both* the 'root' and the '/client' folders
 2. *From the root folder* run the following scripts: "npm run server" and in the separate tab run "npm run client"

 ## App Features
 - The Express server gets data from the JSON file and the DefiLlama API
 - While the data is fetching on the /wallet page, a skeleton loader shows 
 - On the '/wallet' page (also the home page) the Price data is being fetched and the Assets are listed based on their total value in a descending order
 - Each Asset has a current real price, a total value (across all chains), and total amount of tokens
 - Prices are displayed with respect to the number of decimals required
 - If the real price of an asset is not available on DefiLlama, it is displayed as a 'N/A'
 - Those assets, if clicked on, would trigger an animated warning in the top right corner
 - Those assets that do have a real price data from DefiLlama, get opened up in a separate page
 - Each Asset page has a Total Cost Basis, OpenPnL data calculated based on the delta between the purchase price and the current price
 - Further, each asset page contains a list (if there are multiple) of asset chains. Each contains the info on Chain name, asset name, balance on that chain, and total value held on that chain. Note, that if the purchase price was 0 (ie token drop happened) the OpenPnL would show "^MAX"
 - The asset icons on each page is lazy loaded and animated.


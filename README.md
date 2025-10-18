# CustomerLabs React Test - Ready to Run

## What this project includes
- React app (Create React App style)
- TailwindCSS setup files (postcss + tailwind config)
- Modal that matches the sample UI (teal header, green Save, pink Cancel)
- Sends segment JSON to your webhook.site URL:
  `https://webhook.site/8029be2f-d340-4dff-b737-aab685680e0c`

## How to run locally

1. Make sure you have Node.js installed (>=16 recommended).
2. Extract the ZIP and open a terminal in the project folder.
3. Run:
   ```
   npm install
   npx tailwindcss -i ./src/index.css -o ./src/tailwind-output.css --minify
   npm start
   ```
   or simply:
   ```
   npm install
   npm start
   ```
   (Create React App will process CSS; the separate tailwind build command is optional if CRA handles PostCSS plugins.)

4. Open http://localhost:3000

## Notes
- The project is pre-configured to POST to your webhook URL.
- Replace the webhook URL in `src/components/Modal.jsx` if you want to change it.


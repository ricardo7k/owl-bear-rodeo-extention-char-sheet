# OwlBear Rodeo Character Sheet Extension

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This extension provides a custom character sheet for Owl Bear Rodeo (OBR) 2.0, allowing players and GMs to manage character information directly within the OBR interface.  It includes a tabbed interface with sections for core stats, abilities, inventory, spells, and notes.  The extension also demonstrates real-time synchronization of character data across all connected clients in the same OBR scene.

## Features

*   **Tabbed Character Sheet:**  Organizes character information into logical sections:
    *   Core Stats
    *   Abilities
    *   Inventory
    *   Spells
    *   Notes
*   **Real-time Synchronization:** Changes made by one player are reflected for all players in the same scene.
*   **Customizable:**  The character sheet structure and fields are easily customizable by modifying the code.
*   **Dice Roller Integration:** (Future enhancement - currently uses OBR's built-in dice roller)  Plans to integrate a custom 3D dice roller.
* **Modal for Image Display**: The extension includes a feature to display images in a modal, enhancing the visual experience during gameplay.  Clicking on a token with an associated image URL will trigger the modal to appear, showcasing the image.

## Prerequisites

*   An Owl Bear Rodeo 2.0 account.
*   Basic understanding of HTML, CSS, and JavaScript.
*   Node.js and npm (or yarn) installed for the server component (if using the provided example server).

## Installation and Usage

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/ricardo7k/owl-bear-rodeo-extention-char-sheet.git](https://www.google.com/search?q=https://github.com/ricardo7k/owl-bear-rodeo-extention-char-sheet.git)
    cd owl-bear-rodeo-extention-char-sheet
    ```

2.  **Install Server Dependencies (Optional):**

    If you are using the provided Node.js server for enhanced synchronization and data persistence (recommended), navigate to the `server` directory and install the dependencies:

    ```bash
    cd server
    npm install
    ```
    This project uses `firebase-admin`. You'll need a service account key. See the "Firebase Setup" section below.

3.  **Configure Firebase (Optional - for Server):**
     *   Create a Firebase project in the Firebase console ([https://console.firebase.google.com/](https://www.google.com/url?sa=E&source=gmail&q=https://console.firebase.google.com/)).
    *   Enable Firestore Database.
    * Enable Authentication (Email/Password, Google, or other methods as needed).
    *   Create a service account key and download the JSON file.  *Do not commit this file to your repository*.  Rename it to `serviceAccountKey.json` and place it in the server folder.
    * Set Firestore Security rules.  An example rule is provided below, *but you should customize this for your specific security needs*.

    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
    	  match /personagens/{docId} {
          allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
        }
      }
    }
    ```

4.  **Start the Server (Optional):**

    If you are using the Node.js server, start it:

    ```bash
    cd server
    node server.js
    ```
    The server will run on port 8080 by default. You can change this in `server.js`.

5.  **Add the Extension to Owl Bear Rodeo:**

    *   Open Owl Bear Rodeo 2.0.
    *   Go to Settings (gear icon).
    *   Click on "Extensions".
    *   Click "Add Extension".
    *   Click "Choose Files".
    *   Select the `manifest.json` file from the `client` directory of this repository.  *You do not need to upload the entire repository, just the `manifest.json` file*.
    *   Click "Add".

6. **Access the Extension:**

   * Inside a scene in OBR, you can use the shortcut `Ctrl+P` (configurable in `manifest.json`) to display the character sheet.

## Project Structure

*   **`client/`:** Contains the code for the Owl Bear Rodeo extension (HTML, CSS, JavaScript).
    *   `index.html`:  The main HTML file for the extension's UI.
    *   `script.js`:  The JavaScript code for the extension's logic, including interaction with the OBR SDK.
    *   `style.css`:  The CSS styles for the extension's UI.
    *   `manifest.json`:  The extension manifest file, which describes the extension to OBR.
    * `libs/`: Folder to contain 3rd party libs.
        *  `@3d-dice/dice-box-threejs`: 3D Dice roller (currently not used)
*   **`server/` (Optional):** Contains the code for the Node.js server (using Express and Firebase Admin SDK).
    *   `server.js`:  The main server file.
    *   `db.js`:  Handles database interactions with Firestore.
    *   `middleware.js`:  Contains middleware for authentication (verifying Firebase ID tokens).
    *   `routes.js`:  Defines the API routes for the server.
    *   `serviceAccountKey.json`:  *Your Firebase service account key file (do not commit this!).*
    *   `package.json`:  Node.js project file, listing dependencies.
    *   `views/`: Contains EJS templates for server-side rendering (optional).
        * `pages/`:
           * `index.ejs`
           *  `pop.ejs`

## Customization

*   **Character Sheet Fields:**  Modify the `client/index.html` and `client/script.js` files to add, remove, or change the fields on the character sheet.
*   **Styling:**  Edit `client/style.css` to customize the appearance of the character sheet.
*   **Server Logic (Optional):**  If you are using the Node.js server, you can modify `server/db.js` and `server/routes.js` to change how data is stored and retrieved.
* **Dice Roller:** You can add a custom dice roller inside the extension, using a 3rd party library like `@3d-dice/dice-box-threejs`

## Firebase Setup (for Server)

The provided Node.js server uses Firebase for authentication and data storage.  This is optional, but recommended for persistent data storage and real-time synchronization.

1.  **Create a Firebase Project:** Follow the instructions in the Firebase documentation to create a new project.
2.  **Enable Firestore:**  Enable Firestore Database in your Firebase project.
3.  **Enable Authentication:** Enable the authentication methods you want to use (e.g., Email/Password, Google).
4.  **Create a Service Account:**
    *   Go to Project Settings (gear icon) -> Service Accounts.
    *   Click "Generate New Private Key".
    *   Download the JSON file.
    *   Rename the downloaded file to `serviceAccountKey.json` and place it in the `server` directory.  **Do not commit this file to your repository!**
5.  **Set Firestore Security Rules:**  Configure your Firestore security rules to control access to your data.  The example rules provided above are a starting point, but you should customize them to meet your specific security requirements.

## Security Considerations

*   **Service Account Key:**  The `serviceAccountKey.json` file contains sensitive credentials.  *Never* commit this file to a public Git repository.  Use environment variables or a secret management service (like Google Cloud Secret Manager) to store this information securely in production.
*   **Firestore Security Rules:**  Carefully design your Firestore security rules to ensure that only authorized users can access and modify data.  The example rules provided are a starting point, but you should thoroughly understand and customize them.
* **CORS:** Configure properly the CORS in production.
* **Input validation:** Always validate and sanitize the inputs.

## Contributing

Contributions are welcome!  Please submit pull requests or open issues on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
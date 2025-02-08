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
*   **Dice Roller Integration:** Acustom 3D dice roller.

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

    If you are using the provided Node.js server for enhanced synchronization and data persistence (recommended):

    ```bash
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
    node server.js
    ```
    The server will run on port 8080 by default. You can change this in `server.js`.

5.  **Add the Extension to Owl Bear Rodeo:**

    *   Open Owl Bear Rodeo 2.0.
    *   Go to Settings (gear icon).
    *   Click on "Extensions".
    *   Click "Add Extension".
    *   Put the url of `manifest.json` file from the `client` directory of this repository.  *You do not need to upload the entire repository, just the `manifest.json` file*.
    *   Click "Add".

## Contributing

Contributions are welcome!  Please submit pull requests or open issues on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
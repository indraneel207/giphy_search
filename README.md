# Giphy Search App

Welcome to the **Giphy Search App**! This is a simple React-based application that allows users to search for GIFs and see trending GIFs using the Giphy API. Users can interact with the app by typing search queries and seeing GIFs in real-time.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Interacting with the App](#interacting-with-the-app)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Demo

A live version of the app can be found [here](#).

## Features

- **Search for GIFs**: Enter search terms to find relevant GIFs.
- **Trending GIFs**: See popular GIFs trending right now.
- **Previous Searches**: Quickly revisit recent searches using clickable chips.
- **Copy URL to Clipboard**: Click a button to copy a GIF URL for easy sharing.
- **Responsive Design**: Suitable for both desktop and mobile use.

## Prerequisites

To interact with and run the Giphy Search App, make sure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** (package manager)

## Installation

To get started, clone the repository and install the required dependencies.

```sh
git clone https://github.com/indraneel207/giphy_search.git
cd giphy_search
npm install
# OR
yarn install
```

## Environment Variables

The application relies on the Giphy API for fetching GIF data. To get started, you need to create a `.env` file in the root directory of the project with the following:

```env
REACT_APP_GIPHY_API_KEY=your_giphy_api_key_here
```

- **REACT_APP_GIPHY_API_KEY**: You can get this API key by registering at [Giphy Developers](https://developers.giphy.com/).

## Usage

To start the app locally:

```sh
npm start
# OR
yarn start
```

Once started, the application will run locally on [http://localhost:3000](http://localhost:3000).

## Interacting with the App

Here's how you can interact with the app:

### 1. **Search for GIFs**:
   - Type a keyword in the **search bar** and press **Enter** or wait for the debounce (1 second) to kick in.
   - GIF results related to your search term will be displayed.

### 2. **Trending GIFs**:
   - On page load, the app will display **trending GIFs** to get you started.
   - You can explore what's currently popular in GIFs without typing anything in the search bar.

### 3. **Previous Searches**:
   - Below the search bar, you will see **chips** representing your **recent searches**.
   - Click on any chip to perform that search again quickly.

### 4. **Copy URL to Clipboard**:
   - Each GIF has a **"Copy URL"** button.
   - Click this button to **copy the URL** of the GIF to your clipboard so you can easily share it with others.

### 5. **Loader During Debounce**:
   - When typing in the search bar, you will see a **loading indicator** during the debounce period, letting you know that the app is processing your input.

### 6. **Error Handling**:
   - If the **API rate limit** is exceeded, the app will display an appropriate error message.
   - Other errors, such as connectivity issues, are also handled to ensure a smooth user experience.

## Technologies Used

- **React** (v18) - The front-end library used to build the UI.
- **React Router** - For managing navigation and routes within the app.
- **Axios** - For handling API requests to Giphy.
- **React-Toastify** - To display toasts for copying URLs or displaying errors.
- **Lodash (Debounce)** - To manage the search request frequency efficiently.
- **React Context** - For managing global app state (e.g., previous searches).
- **CSS** - Custom styling for a clean UI.

## Folder Structure

```plaintext
giphy-search-app/
  ├── public/
  ├── src/
      ├── config/                # Config Files
      ├── hooks/
          ├── api/               # Custom hooks for API interactions
          ├── context/           # Context for managing app state
      ├── pages/
          ├── Home.tsx           # Main page where search functionality is implemented
      ├── App.tsx                # Main app entry component
  ├── .env                       # Environment variables
  ├── package.json               # Dependencies and scripts
  ├── README.md                  # You're here!
```

## Contributing

Contributions are welcome! If you have ideas for new features or find any bugs, feel free to open an **issue** or submit a **pull request**.

### Steps to Contribute:

1. **Fork** this repository.
2. Create a new **branch** with a descriptive name:
   ```sh
   git checkout -b feature/some-feature
   ```
3. Make your changes and **commit** them:
   ```sh
   git commit -m 'Add some feature'
   ```
4. **Push** to your branch:
   ```sh
   git push origin feature/some-feature
   ```
5. Open a **pull request** to the `main` branch of this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Contact

For any questions or support, please open an issue on the repository.

Happy searching! 🎉
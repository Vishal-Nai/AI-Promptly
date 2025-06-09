# AI-Promptly

## Overview
AI-Promptly is a React application designed to demonstrate the integration of Mixpanel and Google Analytics for tracking user interactions and page visits. This project serves as a basic setup for developers looking to implement analytics in their applications.

## Features
- **Mixpanel Integration**: Track page visits and menu click events with Mixpanel.
- **Google Analytics Integration**: Basic setup for Google Analytics to track user interactions.
- **Environment Variables**: Use of environment variables for configuration, making it easy to manage different environments.

## Getting Started
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd Promptly
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory with the following content:
     ```
     VITE_MIXPANEL_TOKEN=your_mixpanel_token
     VITE_DEBUG=true
     VITE_TRACK_PAGEVIEW=false
     VITE_GA_MEASUREMENT_ID=your_ga_measurement_id
     ```

4. **Run the Application:**
   ```bash
   npm run dev
   ```

## Detailed Setup Instructions

### Mixpanel Integration
1. **Install Mixpanel SDK:**
   ```bash
   npm install mixpanel-browser
   ```

2. **Initialize Mixpanel:**
   - In `src/services/mixpanelService.ts`, initialize Mixpanel with your project token:
     ```typescript
     import mixpanel from 'mixpanel-browser';

     const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';

     mixpanel.init(MIXPANEL_TOKEN, {
       debug: import.meta.env.VITE_DEBUG === 'true',
       persistence: 'localStorage',
       track_pageview: import.meta.env.VITE_TRACK_PAGEVIEW === 'true'
     });
     ```

3. **Track Events:**
   - Use the `trackEvent` function to log events:
     ```typescript
     const trackEvent = (eventName: string, userId: string, properties?: Record<string, any>) => {
       mixpanel.track(eventName, { userId, ...properties });
     };
     ```

### Google Analytics Integration
1. **Install Google Analytics SDK:**
   ```bash
   npm install react-ga4
   ```

2. **Initialize Google Analytics:**
   - In your main entry file (e.g., `main.tsx`), initialize Google Analytics:
     ```typescript
     import ReactGA from 'react-ga4';

     ReactGA.initialize('YOUR_GA_MEASUREMENT_ID');
     ```

3. **Track Page Views:**
   - Use `ReactGA.send({ hitType: "pageview", page: window.location.pathname });` to track page views.

## Usage
- **Mixpanel**: The application tracks page visits and menu click events using Mixpanel. Ensure your Mixpanel token is correctly set in the `.env` file.
- **Google Analytics**: Basic setup for Google Analytics is included. You can extend this setup to track more specific events as needed.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

## Initial Setup for Mixpanel and Google Analytics

### Mixpanel
1. **Create a Mixpanel Account:**
   - Go to [Mixpanel's website](https://mixpanel.com/) and sign up for an account.
   - Follow the on-screen instructions to complete the registration process.

2. **Create a New Project:**
   - Once logged in, create a new project from the dashboard.
   - Note the project token provided, as it will be used to initialize Mixpanel in your application.

3. **Set Up Environment Variables:**
   - Add your Mixpanel project token to the `.env` file:
     ```
     VITE_MIXPANEL_TOKEN=your_mixpanel_token
     ```

### Google Analytics
1. **Create a Google Analytics Account:**
   - Go to [Google Analytics](https://analytics.google.com/) and sign in with your Google account.
   - Follow the prompts to set up a new account and property.

2. **Set Up a Property:**
   - Create a new property and select the appropriate data stream (e.g., Web).
   - Follow the instructions to set up the data stream and obtain the Measurement ID.

3. **Set Up Environment Variables:**
   - Add your Google Analytics Measurement ID to the `.env` file:
     ```
     VITE_GA_MEASUREMENT_ID=your_ga_measurement_id
     ```

4. **Initialize Google Analytics:**
   - Use the Measurement ID to initialize Google Analytics in your application as described in the previous sections.

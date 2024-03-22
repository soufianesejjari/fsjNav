## Overview

fsNav is a mobile application developed using React Native and Expo. It serves as a navigation app for the Faculty of Sciences El Jadida, integrating Google Maps for navigation, Firebase for data storage, and authentication features. The app allows users to explore events, locations, and search for places within the faculty.
## Screenshots

Here are some screenshots of the fsNav app in action:

1. **objectifs**
 ![(objectifs) (4)](https://github.com/soufianesejjari/fsjNav/assets/81421925/00e0cf57-7cb2-4b8f-8a71-6179134adb52)
3. **Event Creation Screen**
![Event Creation](https://github.com/soufianesejjari/fsjNav/assets/81421925/7d842823-ef56-46b9-8802-4dd949a0fc39)


5. **Event Listing Screen**
   ![Event Listing](https://github.com/soufianesejjari/fsjNav/assets/81421925/3872bd6c-2ec2-4b54-a5f2-303ea831887e)


8. **Location Exploration Screen**
   
   ![Location Exploration](https://github.com/soufianesejjari/fsjNav/assets/81421925/3cbe0388-e98c-4aaa-a6df-b9f4ae5cc609)


10. **Location Details Screen**  
![Location Exploration](https://github.com/soufianesejjari/fsjNav/assets/81421925/664d5c0e-eca1-40df-ba0a-979f965443cf)

11. **Authentication Screens**
    ![Authentication](https://github.com/soufianesejjari/fsjNav/assets/81421925/73ecb4bf-6437-44d0-af11-dec60eac044b)


## Technologies

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Google Maps API](https://developers.google.com/maps/documentation)
- [Firebase](https://firebase.google.com/)

## Getting Started

To get started with fsNav, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/soufianesejjari/fsjNav
   ```
1. Navigate to the project directory:

   ```bash
   cd fsNav
   ```
1. Install the dependencies:

   ```bash
   npm install
   ```
1. Start the application:
   ```bash
   expo start
This will start the Expo development server. You can run the app on an emulator/simulator or scan the QR code with the Expo Go app on your mobile device.
## Project Structure
The project structure is organized as follows:

- **screens/**: Individual screens of the application.
   - **components/**: Reusable React components.
- **nav/**: Navigation configuration with React Navigation.
- **firebaseServices/**: Firebase services and other utility functions.
- **App.js**: Entry point of the application.

Feel free to explore and modify the code as needed.


## Configuration

Make sure to configure the following:

### Firebase Configuration:

1. Create a Firebase project and obtain the configuration details.
2. Update the Firebase configuration in `fsNav/firebaseServices/firebase.js`.

### Google Maps API Key:

1. Obtain an API key from the Google Cloud Console.
2. Update the API key in the **Map component** or service and the **app.json**  .

### Adding Custom Location Groups:

To add custom location groups, follow these steps:

1. Navigate to `fsNav/firebaseServices/Batiments.js`.
2. Modify the component to include the desired custom locations in the same format as existing entries.

## Features

### Events

- **Event Creation:** Users can create new events by providing event name, description, location, date, time, and image URL.
- **Event Listing:** The app displays a list of upcoming events, including their details such as name, date, and location.
- **Event Details:** Users can view detailed information about each event, including its description, location, date, time, and any associated images.
- **Event Search:** Users can search for specific events by name or location.

### Locations

- **Location Information:** Users can explore various locations within the faculty, such as lecture halls, laboratories, and offices.
- **Location Details:** Detailed information about each location is provided, including its description, address, and any associated images.
- **Location Search:** Users can search for specific locations by name or description.

### Authentication

- **User Registration:** New users can register an account by providing their email address and password.
- **User Login:** Registered users can log in to their accounts using their email address and password.
- **User Profile:** Logged-in users have access to their profile information and can update their details if needed.

### UI Components

Various UI components such as Text, Button, and SafeAreaView are used for layout and interaction.

### Custom Components

There is a commented-out <OptionM/> component, indicating the presence of a custom component named OptionM. This component might be intended for additional features or options related to the app.

## Conclusion

In conclusion, fsNav provides a comprehensive solution for navigation and event management within the Faculty of Sciences El Jadida. With features like event creation, location exploration, and user authentication, the app offers a seamless experience for faculty members and students alike.

The integration of Firebase for data storage and authentication, along with Google Maps API for navigation, ensures reliability and accuracy in the app's functionality. Additionally, the use of React Native and Expo facilitates cross-platform development, making the app accessible to a wide range of users.

As the app continues to evolve, there are opportunities for further enhancements and refinements. Future updates may include additional features such as real-time event notifications, improved search functionality, and integration with other campus services.

Overall, fsNav represents a valuable asset for the Faculty of Sciences El Jadida, enhancing communication, organization, and convenience for all its users.



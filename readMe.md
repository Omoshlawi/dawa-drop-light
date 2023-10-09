# Dawa -Drop Light

Google Maps offers a feature called "URL Scheme" that allows you to create custom links to open the Google Maps app with specific parameters.

By constructing a URL with the appropriate parameters, you can launch Google Maps with the desired location information. Users will be redirected to Google Maps, where they can view the directions and tracking information.

Here's an example of how you can construct the URL:

ruby
Copy code
https://www.google.com/maps/dir/?api=1&origin=SOURCE_LATITUDE,SOURCE_LONGITUDE&destination=DESTINATION_LATITUDE,DESTINATION_LONGITUDE&travelmode=DRIVING
Replace SOURCE_LATITUDE, SOURCE_LONGITUDE, DESTINATION_LATITUDE, and DESTINATION_LONGITUDE with the actual latitude and longitude coordinates of the source and destination locations. You can also modify the travelmode parameter to specify different travel modes like driving, walking, or transit.

When a user clicks on this URL from your application, it will open the Google Maps app (if installed) and display the directions and tracking information based on the given parameters.

Keep in mind that the user's device needs to have the Google Maps app installed for this redirection to work seamlessly. If the app is not available on their device, they will be redirected to the Google Maps website instead.

Additionally, always ensure that you comply with Google Maps API usage policies and terms of service while using this feature.

https://www.google.com/maps/dir/?api=1&origin=-1.43444,35.65566&destination=-2.434566,37.988575&travelmode=DRIVING



# -------------------------------
Google AdMob (AdSense for Mobile Apps):

Expo Documentation: https://docs.expo.dev/monetization/admob/
React Native Admob Library: https://github.com/sbugert/react-native-admob
Facebook Audience Network:

Expo Documentation: https://docs.expo.dev/monetization/fan/
React Native Facebook Ads Library: https://github.com/facebook/react-native-fbsdk
Unity Ads:

Unity Ads Documentation: https://unity.com/solutions/unity-ads
Unity Ads Expo Package: https://github.com/mediamonks/expo-unity-ads
AppLovin MAX:

AppLovin MAX Expo Package: https://github.com/AppLovin/expo-adapter




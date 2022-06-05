#Outline

- React website where users can log in with discord oAuth and sign up for scheduled repeating dms of a forest animal of their choice.
- Server owners can also log in and subscribe a channel to the same system as above.
- In this system the react app will communicate the changes and settings to a mongodb instance which the discord bot also can access.
- The discord bot would be listening for a notification that a user changed their settings and can make the appropriate action.
- On a timer, the discord bot wil, send the messages to the correct channels or dms.
- There will also be slash commands for managing these settings as well in case the website is broken or a user just wants to manage their settings through commands.
- The discord bot will have safeguards to make sure that spam does not happen.
- The discord bot will save the last time a message was sent to a user or channel and make sure that no messages are sent before the timer for that user or channel is up. This in combination with an easy opt-out/ cancel feature will ensure that users and channels have a good user experience.
- The discord bot will also be able to send messages on command with manual triggers.
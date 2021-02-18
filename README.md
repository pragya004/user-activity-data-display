#User-activity-data-display

##Introduction -

User-activity-data-display app fetches json user activity data from an external api and displays it in the form of table.
The user can then click on any user to see its login and logout data of the current date in a modal.
Additionally user can also click on the calendar input and select date for which they want to see the user data.

######customization - 
1. Since the data is fetched from an external api, hence lazy loading was also integrated because in a slower network(3G/2G) data fetch may be slow.
2. The data is fetched only once and is stored in a state which is then used by the other components to do various tasks and display different data.

######live demo - 
https://user-activity-data-display.herokuapp.com/

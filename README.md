# WP Headless App

React app to print WordPress posts by API request using GraphQL with Apollo Client and Firebase Authentication.

Users can view WP posts and, if they are authenticated, they can post comments.

To allow comments from users with no WP account you need to add this line in your functions.php file:

```javascript
add_filter( 'rest_allow_anonymous_comments', '__return_true' );
```

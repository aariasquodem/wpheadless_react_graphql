# WP Headless App

React app to print WordPress posts by API request using GraphQL with Apollo Client and Firebase Authentication.

Users can view WP posts and, if they are authenticated, they can post comments.

To allow comments from users with no WP account you need to add this line in your functions.php file:

```javascript
add_filter( 'rest_allow_anonymous_comments', '__return_true' );
```

To set the max amount of nodes return by the query, you need to add this filter in your functions.php file. We only use this to get the comments:

```javascript
add_filter( 'graphql_connection_max_query_amount', function( $amount, $source, $args, $context, $info  ) {

    if ( current_user_can( 'manage_options' ) ) {
         $amount = 1000;
    }

    return $amount;

}, 10, 5 );
```

import React, {Component} from 'react';


class Footer extends Component {
render() {
return(
      <footer tabIndex={0}>
          		 <h3>Project powered by
               <a href="https://developers.google.com/maps/" tabIndex={0} aria-label="Google maps"> Google Maps </a>
               and <a href="https://developer.foursquare.com/" tabIndex={0} aria-label="Foursquare">Foursquare</a> APIs.</h3>

      	</footer>
);
}
}
export default Footer;

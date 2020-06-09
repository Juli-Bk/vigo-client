import React from 'react';
import { Typography, Box, Link } from '@material-ui/core';
import useStyles from './ContactItemStyle';
import PropTypes from 'prop-types';

const ContactItem = props => {
  const {icon, type, contactsArray} = props;
  const styles = useStyles();

  let contacts = [];

  switch (type) {
    case 'tel':
      contacts = contactsArray.map((item, index) => (
        <Typography className={styles.contact} key={index} variant='h3'>
          <Link href={'tel:' + item} color="inherit">
            {item}
          </Link>
        </Typography>
      ));
      break;
    case 'email':
      contacts = contactsArray.map((item, index) => (
        <Typography className={styles.contact} key={index} variant='h3'>
          <Link href={'mailto:' + item} color="inherit">
            {item}
          </Link>
        </Typography>
      ));
      break;
    default:
      contacts = contactsArray.map((item, index) => (
        <Typography className={styles.contact} key={index} variant='h3'>
          {item}
        </Typography>
      ));
  }

  return (
    <Box className={styles.box}>
      {icon}
      <Box className={styles.contactsBlock}>
        {contacts}
      </Box>
    </Box>
  );
};

ContactItem.propTypes = {
  icon: PropTypes.object.isRequired,
  type: PropTypes.string,
  contactsArray: PropTypes.array.isRequired
};

export default React.memo(ContactItem);
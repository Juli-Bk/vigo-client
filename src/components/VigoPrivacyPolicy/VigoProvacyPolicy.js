import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './VigoPrivacyPolicyStyle';

const VigoPrivacyPolicy = () => {
  const styles = useStyles();

  return (
    <>
      <Typography className={styles.title} variant='h1'>Our PRIVACY POLICY</Typography>
      <Typography className={styles.text} variant='body1'>
        This policy describes how we handle your data when you use our service.
      </Typography>
      <Typography className={styles.text} variant='body1'>
        How we handle information about you depends on which Times Services you use — and how you use them. We use different information about print subscribers than website visitors.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      The information we gather about you depends on the context. By and large, it’s information about you that can personally identify you — either on its own or when combined with other information.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      With your consent, we do comply with your requests to collect data about your friends, family or acquaintances (e.g., Refer a Friend campaigns). This functionality is only meant for U.S. residents. By using it, you acknowledge and agree that both you and your contacts are based in the United States — and that you have everyone’s consent for us to use their contact information.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      With your consent, we do comply with your requests to collect data about your friends, family or acquaintances (e.g., Refer a Friend campaigns). This functionality is only meant for U.S. residents. By using it, you acknowledge and agree that both you and your contacts are based in the United States — and that you have everyone’s consent for us to use their contact information.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      Marketing, data analytic and social media-owned databases give us access to a range of information — like public data, survey data and beyond. This data sometimes includes your mailing address, your gender, your age, your household income and other demographic data.
      </Typography>
      <Typography className={styles.text} variant='body1'>
      To process payments or donations, we collect and use your payment information. This can include your name, your address, your telephone number, your email address, your credit or debit card information and any other relevant information.
      </Typography>
    </>
  );
};

export default VigoPrivacyPolicy;
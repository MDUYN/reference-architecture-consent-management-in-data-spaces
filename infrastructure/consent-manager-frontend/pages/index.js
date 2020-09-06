import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useRouter} from "next/router";
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/components/copyright';
import {Button} from "@material-ui/core";

export default function Index() {
  return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Button onClick={() => console.log('hello')} color="secondary">
            Go to the about page
          </Button>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
  );
}
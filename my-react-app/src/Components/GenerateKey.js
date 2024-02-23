import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



export default function GenerateKey() {
  return (
    <div>
        <Button size="large">Generate Random Key</Button>
        <Box
        height={200}
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
        >
        Key
        </Box>
    </div>
  );
}
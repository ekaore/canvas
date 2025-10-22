import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface CouplingDashboardProps {
  onAddCoupling: () => void;
}
//будет относится к инструментам, пока находится тут!
export const EditorButton: React.FC<CouplingDashboardProps> = ({ onAddCoupling }) => (
  <Box sx={{ position: 'absolute', marginRight: '600px' }}>
    <Typography variant="h6" gutterBottom>муфта</Typography>
    <Typography variant="h6" gutterBottom>мтаг-212</Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={onAddCoupling}
      sx={{ minWidth: 48, width: 48, height: 48, fontSize: 24, p: 0 }}
    >
      +
    </Button>
  </Box>
);

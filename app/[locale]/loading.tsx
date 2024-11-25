import Loading from '@/component/ui/Loading'
import { CircularProgress, Stack } from '@mui/material';
import React from 'react';

function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

const WebsiteLoading = () => {
    return (
        <Stack height={"100dvh"} width={"100%"} justifyContent={"center"} alignItems={"center"} >
            <GradientCircularProgress />
        </Stack>
    )
}

export default WebsiteLoading

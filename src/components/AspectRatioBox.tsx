import { Box } from '@mui/material';
import React, { Fragment, FunctionComponent } from 'react';

interface IAspectRatioBoxProps {
  ratio?: number;
}

const AspectRatioBox: FunctionComponent<IAspectRatioBoxProps> = ({ children, ratio }) => {
  if (!ratio) {
    return <Fragment>{children}</Fragment>;
  }
  return (
    <Box position={'relative'}>
      <Box
        position={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        style={{ '& > *': { height: '100%', width: '100%' } }}
      >
        {children}
      </Box>
      <Box style={{ paddingBottom: (1 / ratio) * 100 + '%' }} />
    </Box>
  );
};

export default AspectRatioBox;

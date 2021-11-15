import { Grid, Stack } from '@mui/material';
import { IMuiFbPhotoGridImage, MuiFbPhotoGrid } from 'mui-fb-photo-grid';
import 'mui-fb-photo-grid/dist/index.css';
import React from 'react';

// -----------------------------------------------------------------------------------------------

const IMAGE_VERTICAL = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
const IMAGE_HORIZONTAL = 'https://img-19.ccm2.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg';

const setImage = (image: typeof IMAGE_VERTICAL | typeof IMAGE_HORIZONTAL): IMuiFbPhotoGridImage => {
  return {
    title: '...',
    img: image,
  };
};

type IGroupNumImage = IMuiFbPhotoGridImage[][];

const ONE: IGroupNumImage = [[setImage(IMAGE_VERTICAL)], [setImage(IMAGE_HORIZONTAL)]];

const TOW: IGroupNumImage = [
  [setImage(IMAGE_VERTICAL), setImage(IMAGE_HORIZONTAL)],
  [setImage(IMAGE_VERTICAL), setImage(IMAGE_VERTICAL)],
  [setImage(IMAGE_HORIZONTAL), setImage(IMAGE_HORIZONTAL)],
];

const THREE: IGroupNumImage = [
  [setImage(IMAGE_VERTICAL), setImage(IMAGE_HORIZONTAL), setImage(IMAGE_VERTICAL)],
  [setImage(IMAGE_VERTICAL), setImage(IMAGE_VERTICAL), setImage(IMAGE_VERTICAL)],
  [setImage(IMAGE_HORIZONTAL), setImage(IMAGE_HORIZONTAL), setImage(IMAGE_VERTICAL)],
];

const FOUR: IGroupNumImage = [...THREE.map(group => [...group, setImage(IMAGE_HORIZONTAL)])];

const FIVE: IGroupNumImage = [...FOUR.map(group => [...group, setImage(IMAGE_VERTICAL)])];

const MORE: IGroupNumImage = [...THREE.map(group => [...group, setImage(IMAGE_HORIZONTAL), setImage(IMAGE_VERTICAL), setImage(IMAGE_HORIZONTAL), setImage(IMAGE_HORIZONTAL)])];

const GROUP_NUM_IMAGE = [ONE, TOW, THREE, FOUR, FIVE, MORE];

// -----------------------------------------------------------------------------------------------

const App: React.FunctionComponent = () => {
  return (
    <Stack spacing={5}>
      {GROUP_NUM_IMAGE.map(group => (
        <Grid container spacing={3}>
          {group.map(images => (
            <Grid item xs={group.length}>
              <MuiFbPhotoGrid images={images} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Stack>
  );
};

export default App;

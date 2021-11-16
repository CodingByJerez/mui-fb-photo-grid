# mui-fb-photo-grid

[![NPM](https://img.shields.io/npm/v/mui-fb-photo-grid.svg)](https://www.npmjs.com/package/mui-fb-photo-grid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Release](https://github.com/CodingByJerez/mui-fb-photo-grid/actions/workflows/release.yml/badge.svg)](https://github.com/CodingByJerez/mui-fb-photo-grid/actions/workflows/release.yml)

## Demo

<img src="https://github.com/CodingByJerez/mui-fb-photo-grid/blob/master/.github/images/mui-fb-photo-grid-demo.gif?raw=true" height="350" alt="demo mui-fb-photo-grid" />

## Install

```bash
npm install --save mui-fb-photo-grid
or
yarn add mui-fb-photo-grid
```

## Usage

```ts
import { IMuiFbPhotoGridImage, MuiFbPhotoGrid } from 'mui-fb-photo-grid';

const IMAGES:IMuiFbPhotoGridImage[] = [
    {
    title: '...', // require
    img: 'https://my-image', // require
    imgThumbnail: 'https://my-thumbnail-image', // optional
  },
  {
    title: '...',
    img: 'https://my-image',
    imgThumbnail: 'https://my-thumbnail-image',
  },
  {
    title: '...',
    img: 'https://my-image',
    imgThumbnail: 'https://my-thumbnail-image',
  }
  //......
]

<MuiFbPhotoGrid
  images={IMAGES} // require
  reactModalStyle={{overlay: { zIndex: 2000 }}} // optional (https://github.com/reactjs/react-modal#styles)
/>;

```

## License

MIT © [CodingByJerez website](https://codingbyjerez.com/)

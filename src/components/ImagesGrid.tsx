import { alpha, Card, CardActionArea, CardContent, Grid, styled, Typography } from '@mui/material';
import React, { Component, createRef, Fragment, FunctionComponent, ReactNode, RefObject } from 'react';
import AspectRatioBox from './AspectRatioBox';
import LightBox, { ILightBoxRef } from './Iightbox';

//------------------------------------------------------

const CoverStyle = styled('img')(() => ({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
}));

const MoreHoverStyle = styled(CardContent)(({ theme }) => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.grey[900], 0.6),
}));

//------------------------------------------------------

enum ORIENTATION {
  VERTICAL,
  HORIZONTAL,
}

type IImage = { title: string; img: string; imgThumbnail?: string };

interface IProps {
  images: IImage[];
  reactModalStyle?: any;
}

interface IState {
  fistImagePosition?: ORIENTATION;
  lightBox: null | number;
}

class ImagesGrid extends Component<IProps, IState> {
  private _fistImage: RefObject<HTMLImageElement>;
  private _lightBoxRef: RefObject<ILightBoxRef>;

  constructor(props: IProps) {
    super(props);
    this._fistImage = createRef();
    this._lightBoxRef = createRef();
    this.state = {
      fistImagePosition: undefined,
      lightBox: null,
    };
  }

  private _handleImageLoad = (): void => {
    const fistImageRef = this._fistImage.current;
    if (!fistImageRef) {
      return;
    }
    const fistImagePosition = fistImageRef.naturalHeight > fistImageRef.naturalWidth ? ORIENTATION.VERTICAL : ORIENTATION.HORIZONTAL;
    if (fistImagePosition !== this.state.fistImagePosition) {
      this.setState(prevState => ({
        ...prevState,
        fistImagePosition: fistImageRef.naturalHeight > fistImageRef.naturalWidth ? ORIENTATION.VERTICAL : ORIENTATION.HORIZONTAL,
      }));
    }
  };

  private _handleImageClick = (imageIndex: number): void => {
    this._lightBoxRef.current?.open(imageIndex);
  };

  private _HoverMoreRender = ({ imageCount }: { imageCount: number }): JSX.Element => {
    return (
      <MoreHoverStyle>
        <Typography variant="h4" component={'span'}>
          +{imageCount - 5}
        </Typography>
      </MoreHoverStyle>
    );
  };

  public _OneImageRender: FunctionComponent<{ image: IImage }> = ({ image: { title, img, imgThumbnail } }) => {
    return (
      <CardActionArea onClick={() => this._handleImageClick(0)}>
        <Grid container>
          <Grid item xs={12}>
            <CoverStyle alt={title} src={imgThumbnail || img} />
          </Grid>
        </Grid>
      </CardActionArea>
    );
  };

  public _TowImageRender: FunctionComponent<{ images: [IImage, IImage] }> = ({ images }) => {
    return (
      <Grid container spacing={0.2}>
        {images.map(({ title, img, imgThumbnail }, index) => (
          <Grid key={`${index}-${img}`} item xs={6}>
            <CardActionArea onClick={() => this._handleImageClick(index)}>
              <AspectRatioBox ratio={1}>
                <CoverStyle alt={title} src={imgThumbnail || img} />
              </AspectRatioBox>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    );
  };

  public _ThreeAndMoreImageRender: FunctionComponent<{ images: IImage[] }> = ({ images }) => {
    const imageCount = images.length;

    if (this.state.fistImagePosition === ORIENTATION.HORIZONTAL || imageCount > 4) {
      return (
        <Grid container spacing={0.2}>
          <Grid item xs={12} height={'100%'}>
            <Grid container spacing={0.2}>
              {images.slice(0, imageCount < 5 ? 1 : 2).map(({ title, img, imgThumbnail }, index) => (
                <Grid key={`${index}-${img}`} item xs={imageCount < 5 ? 12 : 6}>
                  <CardActionArea onClick={() => this._handleImageClick(index)}>
                    <AspectRatioBox ratio={imageCount < 5 ? undefined : 1}>
                      <CoverStyle ref={index === 0 ? this._fistImage : undefined} alt={title} src={imgThumbnail || img} onLoad={index === 0 ? this._handleImageLoad : undefined} />
                    </AspectRatioBox>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0.2}>
              {images.slice(imageCount < 5 ? 1 : 2, 5).map(({ title, img, imgThumbnail }, index) => (
                <Grid key={`${index}-${img}`} item xs={imageCount === 3 ? 6 : 4}>
                  <CardActionArea onClick={() => this._handleImageClick(index + (imageCount < 5 ? 1 : 2))}>
                    <AspectRatioBox ratio={1}>
                      <CoverStyle alt={title} src={imgThumbnail || img} />
                    </AspectRatioBox>
                    {index === 2 && imageCount > 5 && this._HoverMoreRender({ imageCount })}
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      );
    }
    const imageFirst = images[0];
    return (
      <AspectRatioBox ratio={1}>
        <Grid container spacing={0.2}>
          <Grid item xs={imageCount === 3 ? 6 : 8}>
            <CardActionArea sx={{ height: '100%' }} onClick={() => this._handleImageClick(0)}>
              <CoverStyle ref={this._fistImage} alt={imageFirst.title} src={imageFirst.imgThumbnail || imageFirst.img} onLoad={this._handleImageLoad} />
            </CardActionArea>
          </Grid>
          <Grid item xs={imageCount === 3 ? 6 : 4}>
            <Grid container spacing={0.2}>
              {images.slice(1).map(({ title, img, imgThumbnail }, index) => (
                <Grid key={`${index}-${img}`} item xs={12}>
                  <CardActionArea onClick={() => this._handleImageClick(index + 1)}>
                    <AspectRatioBox ratio={1}>
                      <CoverStyle alt={title} src={imgThumbnail || img} />
                    </AspectRatioBox>
                    {index === 2 && imageCount > 5 && this._HoverMoreRender({ imageCount })}
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </AspectRatioBox>
    );
  };

  private _SelectorRender = () => {
    const { _OneImageRender, _TowImageRender, _ThreeAndMoreImageRender } = this;
    const { images } = this.props;
    const imageCount = images.length;

    if (imageCount === 1) {
      return <_OneImageRender image={images[0]} />;
    } else if (imageCount === 2) {
      return <_TowImageRender images={images as unknown as [IImage, IImage]} />;
    } else if (imageCount > 2) {
      return <_ThreeAndMoreImageRender images={images} />;
    }
    return <Fragment></Fragment>;
  };

  public render(): ReactNode {
    const { _SelectorRender, _lightBoxRef } = this;
    const { images, reactModalStyle } = this.props;
    return (
      <Card>
        <_SelectorRender />
        <LightBox ref={_lightBoxRef} images={images} reactModalStyle={reactModalStyle} />
      </Card>
    );
  }
}

export type { IImage };
export default ImagesGrid;

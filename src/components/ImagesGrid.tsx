import { alpha, Card, CardActionArea, CardContent, Grid, styled, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import AspectRatioBox from './AspectRatioBox';

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
  //backdropFilter: 'blur(3px)',
  // WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.grey[900], 0.6),
}));

//------------------------------------------------------

enum ORIENTATION {
  VERTICAL,
  HORIZONTAL,
}

type IImage = { title: string; img: string };

interface IProps {
  images: IImage[];
}

interface IState {
  fistImagePosition?: ORIENTATION;
}

class ImagesGrid extends React.Component<IProps, IState> {
  private _fistImage: React.RefObject<HTMLImageElement>;

  constructor(props: IProps) {
    super(props);
    this._fistImage = React.createRef();
    this.state = {
      fistImagePosition: undefined,
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

  private _HoverMoreRender = ({ imageCount }: { imageCount: number }): JSX.Element => {
    return (
      <MoreHoverStyle>
        <Typography variant="h4" component={'span'}>
          +{imageCount - 5}
        </Typography>
      </MoreHoverStyle>
    );
  };

  public _OneImageRender: FunctionComponent<{ image: IImage }> = ({ image: { title, img } }) => {
    return (
      <CardActionArea>
        <Grid container>
          <Grid item xs={12}>
            <CoverStyle alt={title} src={img} />
          </Grid>
        </Grid>
      </CardActionArea>
    );
  };

  public _TowImageRender: FunctionComponent<{ images: [IImage, IImage] }> = ({ images }) => {
    return (
      <Grid container spacing={0.2}>
        {images.map(({ title, img }, index) => (
          <Grid key={`${index}-${img}`} item xs={6}>
            <CardActionArea>
              <AspectRatioBox ratio={1}>
                <CoverStyle alt={title} src={img} />
              </AspectRatioBox>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    );
  };

  public _ThreeAndMoreImageRender: FunctionComponent<{ images: IImage[] }> = ({ images }) => {
    const imageFirst = images[0];
    const imageCount = images.length;

    if (this.state.fistImagePosition === ORIENTATION.HORIZONTAL || imageCount > 4) {
      return (
        <Grid container spacing={0.2}>
          <Grid item xs={12} height={'100%'}>
            <Grid container spacing={0.2}>
              {images.slice(0, imageCount < 5 ? 1 : 2).map(({ title, img }, index) => (
                <Grid key={`${index}-${img}`} item xs={imageCount < 5 ? 12 : 6}>
                  <CardActionArea>
                    <AspectRatioBox ratio={imageCount < 5 ? undefined : 1}>
                      <CoverStyle ref={index === 0 ? this._fistImage : undefined} alt={title} src={img} onLoad={index === 0 ? this._handleImageLoad : undefined} />
                    </AspectRatioBox>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0.2}>
              {images.slice(imageCount < 5 ? 1 : 2, 5).map(({ title, img }, index) => (
                <Grid key={`${index}-${img}`} item xs={imageCount === 3 ? 6 : 4}>
                  <CardActionArea>
                    <AspectRatioBox ratio={1}>
                      <CoverStyle alt={title} src={img} />
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

    return (
      <AspectRatioBox ratio={1}>
        <Grid container spacing={0.2}>
          <Grid item xs={imageCount === 3 ? 6 : 8}>
            <CardActionArea sx={{ height: '100%' }}>
              <CoverStyle ref={this._fistImage} alt={imageFirst.title} src={imageFirst.img} onLoad={this._handleImageLoad} />
            </CardActionArea>
          </Grid>
          <Grid item xs={imageCount === 3 ? 6 : 4}>
            <Grid container spacing={0.2}>
              {images.slice(1).map(({ title, img }, index) => (
                <Grid key={`${index}-${img}`} item xs={12}>
                  <CardActionArea>
                    <AspectRatioBox ratio={1}>
                      <CoverStyle alt={title} src={img} />
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

  public render(): React.ReactNode {
    const { _OneImageRender, _TowImageRender, _ThreeAndMoreImageRender } = this;
    const { images } = this.props;

    const imageCount = images.length;
    if (imageCount === 1) {
      return (
        <Card>
          <_OneImageRender image={images[0]} />
        </Card>
      );
    } else if (imageCount === 2) {
      return (
        <Card>
          <_TowImageRender images={images as unknown as [IImage, IImage]} />
        </Card>
      );
    } else if (imageCount > 2) {
      return (
        <Card>
          <_ThreeAndMoreImageRender images={images} />
        </Card>
      );
    }

    return <React.Fragment></React.Fragment>;
  }
}

export type { IImage };
export default ImagesGrid;

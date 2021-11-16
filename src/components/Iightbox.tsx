import React, { forwardRef, ForwardRefRenderFunction, Fragment, useImperativeHandle, useState } from 'react';
import ReactImageLightBox from 'react-image-lightbox';
import { IImage } from './ImagesGrid';

type IRef = {
  open(index: number): void;
};

interface IProps {
  images: IImage[];
  reactModalStyle?: any;
}

const LightBox: ForwardRefRenderFunction<IRef, IProps> = ({ images, reactModalStyle }, ref) => {
  const [currentIndex, setCurrentIndex] = useState<null | number>(null);

  useImperativeHandle(ref, () => ({
    open: (index: number) => {
      setCurrentIndex(index);
    },
  }));

  const handleClose = (): void => {
    setCurrentIndex(null);
  };

  const handleChangeImage = (direction: 'prev' | 'next') => () => {
    setCurrentIndex(prevCurrentIndex => (prevCurrentIndex + direction === 'prev' ? (prevCurrentIndex! + images.length - 1) % images.length : (prevCurrentIndex! + 1) % images.length));
  };

  if (currentIndex === null) {
    return <Fragment></Fragment>;
  }

  return (
    <div>
      <ReactImageLightBox
        //imagePadding={300}
        imageTitle={images[currentIndex].title}
        reactModalStyle={reactModalStyle}
        mainSrc={images[currentIndex].img}
        nextSrc={images[(currentIndex + 1) % images.length]?.img}
        prevSrc={images[(currentIndex + images.length - 1) % images.length].img}
        onCloseRequest={handleClose}
        onMovePrevRequest={handleChangeImage('prev')}
        onMoveNextRequest={handleChangeImage('next')}
      />
    </div>
  );
};
export type { IRef as ILightBoxRef };
export default forwardRef<IRef, IProps>(LightBox);

import React from 'react';
import twFocusClass from '../../../utils/twFocusClass';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { COLOR_ICON } from '../../../constants/Color';
const NextPrev = ({
  containerClassName = '',
  onClickNext = () => {},
  onClickPrev = () => {},
  btnClassName = 'w-10 h-10',
  onlyNext = false,
  onlyPrev = false
}) => (
  <div
    className={`nc-NextPrev relative flex items-center text-neutral-900 dark:text-neutral-300 ${containerClassName}`}
    data-nc-id='NextPrev'
    data-glide-el='controls'>
    {!onlyNext && (
      <button
        className={`${btnClassName} ${
          !onlyPrev ? 'mr-[6px]' : ''
        } bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
        onClick={onClickPrev}
        title='Prev'
        data-glide-dir='<'>
        <NavigateBeforeIcon style={{ color: COLOR_ICON }} />
      </button>
    )}
    {!onlyPrev && (
      <button
        className={`${btnClassName} bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
        onClick={onClickNext}
        title='Next'
        data-glide-dir='>'>
        <NavigateNextIcon style={{ color: COLOR_ICON }} />
      </button>
    )}
  </div>
);

export default NextPrev;

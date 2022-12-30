import useClickAwayListener from '@donnikitos/react-clickaway/hook';
import { ReactNode, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { ReactComponent as ArrowDownSvg } from 'assets/images/icons/arrow_down.svg';
import { ReactComponent as CheckSvg } from 'assets/images/icons/check.svg';

type IOption = {
  value: string;
  label: string;
  meta?: any;
};

type IDropdown = {
  className?: string;
  value?: string;
  arrowIcon?: ReactNode;
  checkIcon?: ReactNode;
  selectClassName?: string;
  optionClassName?: string;
  width?: 'full' | 'normal';
  onChange: (value: string) => void;
  option: IOption[];
};

export default function Dropdown({
  className,
  value,
  arrowIcon,
  checkIcon,
  selectClassName,
  optionClassName,
  width = 'normal',
  onChange,
  option,
}: IDropdown) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<undefined | string>(undefined);
  const [inputRef, setInputRef] = useState<HTMLElement | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const [popperRef, setPopperRef] = useState<HTMLElement | null>(null);

  useClickAwayListener(
    popperRef,
    () => {
      setOpen(false);
    },
    [inputRef, arrowRef]
  );

  useEffect(() => {
    if (value === '') {
      setSelected(undefined);
    }
  }, [value]);

  return (
    <div className={clsx(className, styles.root, [styles[`size_${width}`]])}>
      <div
        className={clsx(styles.selected, selectClassName)}
        ref={setInputRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {selected ? selected : 'select...'}
      </div>
      <div
        className={clsx(styles.arrow, [open && styles.open])}
        onClick={() => {
          setOpen(!open);
        }}
        ref={setArrowRef}
      >
        {arrowIcon ? arrowIcon : <ArrowDownSvg />}
      </div>
      {open ? (
        <div
          className={clsx(styles.option, [open && styles.option_open])}
          ref={setPopperRef}
        >
          {option.map((item) => {
            const active = item.value === selected;
            return (
              <div
                className={clsx(styles.option_item, [
                  active && styles.option_active,
                  optionClassName,
                ])}
                onClick={() => {
                  onChange(item.value);
                  setSelected(item.value);
                  setOpen(false);
                }}
                key={item.value}
              >
                {item.label}
                {checkIcon ? active && checkIcon : active && <CheckSvg />}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

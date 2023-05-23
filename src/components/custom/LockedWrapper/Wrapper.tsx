import React, { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import cs from 'classnames';

import style from './style.module.scss';

import shoppingCart from '../../../assets/cart.svg';
import lockGif from '../../../assets/lock.gif';
import lockframe from '../../../assets/frame-lock.gif';
import linkVector from '../../../assets/VectorLink.svg';

type WrapperPropType = {
  show?: boolean;
  price?: string;
  unlock: () => void;
  loading: boolean;
};

const Wrapper: NextPage<WrapperPropType> = ({ show, price, unlock, loading }) => {
  const [hoverUnlock, setHoverUnlock] = useState(false);

  return (
    <>
      {show && (
        <div className={cs(style.body, 'w-100')}>
          <div
            className={cs(style.container, 'd-flex flex-column flex-md-row justify-content-between align-items-center')}
          >
            <div className="d-flex flex-column align-items-start col-12 col-md-8">
              <div className="signikaBold30 text-white">Content Locked</div>
              <div className="mt-1 UrbanistRegular20 text-white">Pay now to access the premium content</div>
              <div className="mt-4 UrbanistExtraBold24 text-white">
                {price || <div className="spinner-border" />} OCEAN ~{' '}
              </div>
              <div className="my-3 UrbanistExtraLight16 colorGreyLighter text-start">
                *For using this dataset, you will buy 1 DELPRA-26 and immediately spend it back to the publisher.
              </div>
              {loading ? (
                <div className="spinner-border text-light" />
              ) : (
                <button
                  type="button"
                  onClick={() => unlock()}
                  onMouseEnter={(e: React.MouseEvent) => setHoverUnlock(true)}
                  onMouseLeave={(e: React.MouseEvent) => setHoverUnlock(false)}
                  className={cs(
                    style.buy,
                    'd-flex flex-row justify-content-center align-items-center text-white w-100',
                  )}
                >
                  <Image src={shoppingCart} alt="shopping cart" />
                  <span className="ms-2">Buy</span>
                </button>
              )}
              <div className="d-flex flex-row justify-content-start align-items-center mt-2 UrbanistLight16 colorSilver">
                <Image src={linkVector} alt="link-vector" />
                <span className="ms-1">Polygon Mumbai</span>
              </div>
            </div>
            <div className="d-none d-md-flex">
              {!hoverUnlock ? (
                <Image src={lockframe} alt="lock" priority />
              ) : (
                <>
                  <Image src={lockGif} alt="lockGif" priority unoptimized />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wrapper;

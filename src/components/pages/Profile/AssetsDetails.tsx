import React from 'react';
import { NextPage } from 'next';
import cs from 'classnames';

import style from './style.module.scss';

type AssetsDetailsPropType = {
  totalSpent: number;
  totalUnlocked: number;
};

const AssetsDetails: NextPage<AssetsDetailsPropType> = ({ totalSpent, totalUnlocked }) => {
  return (
    <div className={cs(style.assetsDetails, 'd-flex flex-md-row w-100 mt-2 mt-md-5')}>
      <div className={cs(style.separator, 'd-flex flex-column justify-content-center align-items-center col-6')}>
        <div className="signikaBold40">
          {totalSpent} <span className="signikaBold30">OCEAN</span>
        </div>
        <div className="signikaMedium20">Total Spent</div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center col-6">
        <div className="signikaBold40">{totalUnlocked}</div>
        <div className="signikaMedium20">Unlocked Assets</div>
      </div>
    </div>
  );
};

export default AssetsDetails;

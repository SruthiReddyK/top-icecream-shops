import React from 'react';

import ShopDetail from './ShopDetail';

const ShopList = props => {
    const { shops } = props;
    return (
        <div>
            {shops.map(shop => <ShopDetail key={shop.id} shop={shop} />)}
        </div>
    );
}

export default ShopList;
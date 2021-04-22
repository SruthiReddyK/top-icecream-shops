import React from 'react';
import { Card, CardHeader, CardContent, CardMedia, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Tooltip, Avatar } from '@material-ui/core';
import { ExpandMore, Web, Restaurant, Phone } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

import Reviews from './Reviews';

const ShopDetail = props => {
    const { shop } = props;
    return (
        <Card className="shop-container">
            <CardHeader
                avatar={<Avatar style={{ backgroundColor: 'red' }}><Restaurant /></Avatar>}
                title={shop.name}
                subheader={shop.location.display_address.join()}
                action={<Tooltip title="Visit website"><IconButton component="a" href={shop.url} target="_blank"><Web /></IconButton></Tooltip>}
            />
            <CardMedia image={shop.image_url} title={shop.name} className="shop-media" />
            <CardContent>
                <div className="shop-content">
                    <div className="shop-content-phone">
                        <Phone />
                        <a href={`tel:${shop.phone}`} className="shop-content-phone-link"><Typography variant="body1">{shop.display_phone}</Typography></a>
                    </div>
                    <Rating value={shop.rating} precision={0.5} readOnly />
                </div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Reviews</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Reviews reviews={shop.reviews} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </CardContent>
        </Card>
    );
}

export default ShopDetail;
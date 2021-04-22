import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const Reviews = ({ reviews }) => {
    return (
        <div className="shop-review-container">
            {reviews.map(review => (
                <Card key={review.id} className="shop-review-item">
                    <CardHeader
                        title={review.user.name}
                        avatar={<Avatar src={review.user.image_url} alt={review.user.name} />} />
                    <CardContent>
                        <Typography variant="body1" className="shop-review-text">{review.text}</Typography>
                        <Rating value={review.rating} precision={0.5} readOnly />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Reviews;
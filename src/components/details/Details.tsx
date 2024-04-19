import React from 'react';

interface Props {
    name: string;
    description: string;
    imageUrl: string;
}

export const Details = ({ name, description, imageUrl }: Props) => {
    return (
        <div className="details-container">
            <div className="details-header">
                <h3>{name}</h3>
            </div>
            <div className="details-content">
                <div className="details-image">
                    <img src={imageUrl} alt={name} />
                </div>
                <div className="details-description">
                    <h2>About {name}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

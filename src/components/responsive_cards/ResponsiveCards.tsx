import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Card } from 'react-bootstrap';
import { useUser } from '../../hooks/useUser';

interface CardData {
    id: string;
    content: string;
}
const ResponsiveGridLayout = WidthProvider(Responsive);

export const ResponsiveCards = () => {

    const initialCards: CardData[] = [
        { id: '1', content: 'Contenido para la Sección 1' },
        { id: '2', content: 'Contenido para la Sección 2' },
        // Add more cards as needed
    ];



    const onLayoutChange = (layout: any) => {
        console.log('Nuevo diseño:', layout);
    };

    return (
        <ResponsiveGridLayout

            className="layout"
            layouts={{
                lg: [
                    { i: '1', x: 0, y: 0, w: 3, h: 2 },
                    { i: '2', x: 3, y: 0, w: 3, h: 2 },
                    // Add more layouts as needed for larger screens (lg, md, sm, xs)
                ],
            }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} // Define your breakpoints here
            cols={{ lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 }} // Define columns for different breakpoints
            rowHeight={100}
            onLayoutChange={onLayoutChange}
        >
            {initialCards.map(card => (
                <div key={card.id}>
                    <Card style={{ width: '100%', height: '100%' }}>
                        <Card.Body style={{ width: '100%', height: '100%' }}>
                            <h5>Sección {card.id}</h5>
                            <p>{card.content}</p>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </ResponsiveGridLayout>
    );
}

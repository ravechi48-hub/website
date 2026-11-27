import React from 'react';

const brands = [
  { name: '3M', src: '/brands/3m.png' },
  { name: 'Canon', src: '/brands/canon.png' },
  { name: 'Casio', src: '/brands/casio.png' },
  { name: 'Camlin', src: '/brands/camlin.png' },
  { name: 'Classmate', src: '/brands/classmate.png' },
  { name: 'Pidilite', src: '/brands/pidilite.png' }
];

export default function BrandsMarquee() {
  // Repeat 4 sets of the 6 logos for infinite horizontal scrolling without gaps
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <div
      className="brands-marquee"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        padding: '1.5rem 0'
      }}
    >
      <div
        className="brands-marquee__track"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          gap: '1.75rem',
          width: 'max-content'
        }}
      >
        {marqueeItems.map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}`}
            className="brand-card"
            style={{
              flex: '0 0 176px',
              width: '176px',
              height: '96px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={brand.src}
              alt={`${brand.name} logo`}
              width="176"
              height="94"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

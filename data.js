// Shop Data
const shopData = {
    categories: [
        { id: 'engine', name: 'Engine Components' },
        { id: 'exhaust', name: 'Exhaust Systems' },
        { id: 'brakes', name: 'Brake Systems' },
        { id: 'suspension', name: 'Suspension & Forks' },
        { id: 'bodywork', name: 'Bodywork & Fairings' },
        { id: 'electrical', name: 'Electrical & Lighting' },
        { id: 'wheels', name: 'Wheels & Tires' }
    ],
    products: []
};

// Helper to generate products
function generateProducts() {
    const baseNames = {
        engine: ['Piston Kit', 'Cylinder Head', 'Camshaft', 'Crankshaft', 'Valve Set', 'Gasket Kit', 'Oil Pump', 'Timing Chain', 'Clutch Plate', 'Spark Plug Set'],
        exhaust: ['Slip-on Muffler', 'Full System Header', 'Heat Shield', 'Exhaust Tip', 'Catalytic Converter', 'O2 Sensor', 'Mounting Bracket', 'DB Killer', 'Collector Pipe', 'Exhaust Wrap'],
        brakes: ['Brake Caliper', 'Master Cylinder', 'Brake Pads', 'Steel Braided Line', 'Disc Rotor', 'Fluid Reservoir', 'Bleeder Valve', 'Lever Assembly', 'ABS Sensor', 'Mounting Bolts'],
        suspension: ['Rear Shock', 'Fork Springs', 'Fork Seals', 'Steering Damper', 'Lowering Link', 'Fork Oil', 'Preload Adjuster', 'Swingarm Spool', 'Triple Tree', 'Fork Tube'],
        bodywork: ['Front Fender', 'Rear Cowl', 'Side Panel', 'Tank Pad', 'Windscreen', 'Belly Pan', 'Seat Cover', 'Frame Slider', 'Mirror Set', 'License Plate Holder'],
        electrical: ['Headlight Unit', 'Tail Light', 'Turn Signals', 'Battery', 'Regulator Rectifier', 'Stator Coil', 'ECU Unit', 'Wiring Harness', 'Ignition Switch', 'Instrument Cluster'],
        wheels: ['Alloy Rim', 'Spoke Set', 'Tire (Front)', 'Tire (Rear)', 'Wheel Bearing', 'Valve Stem', 'Axle Slider', 'Sprocket', 'Chain', 'Hub Assembly']
    };

    const placeholderImage = 'file:///C:/Users/rmaji/.gemini/antigravity/brain/6cf57223-0b00-4690-ab9e-1ca271c02d21/premium_part_placeholder_1767359190316.png';

    shopData.categories.forEach(cat => {
        const names = baseNames[cat.id];
        names.forEach((name, index) => {
            shopData.products.push({
                id: `${cat.id}-${index + 1}`,
                categoryId: cat.id,
                name: `${name} - Series ${String.fromCharCode(65 + index)}`, // e.g. Series A
                price: Math.floor(Math.random() * (500 - 50 + 1) + 50), // Random price 50-500
                image: placeholderImage
            });
        });
    });
}

generateProducts();

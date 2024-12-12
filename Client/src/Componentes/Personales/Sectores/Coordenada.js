
const manzanas = [
    { id: 1, points: [50, 50, 150, 50, 150, 150, 50, 150], color: "lightblue" },
    { id: 2, points: [160, 50, 260, 50, 260, 150, 160, 150], color: "lightgreen" },
    { id: 3, points: [270, 50, 370, 50, 370, 100, 270, 150], color: 'pink' }
];

const viviendas = [
    { manzanaId: 1, points: [55, 55, 95, 55, 95, 95, 55, 95], color: 'green'},
    { manzanaId: 1, points: [105, 55, 145, 55, 145, 95, 105, 95] },
    { manzanaId: 2, points: [165, 55, 205, 55, 205, 95, 165, 95] },
];

const calles = [
    { points: [155, 50, 155, 150], color: "gray" },
    { points: [50, 155, 300, 155], color: "gray" },
    { points: [375, 50, 375, 155], color: 'gray' }
];


export default {manzanas, viviendas, calles}

const manzanas = [
    { id: 1, points: [20, 113, 90, 113, 90, 200, 78, 250, 20, 250, 20, 113], color: "pink", text: 'MBA001\n65\nI.E. Ex\nTambo', mz: 'M1' },
    { id: 2, points: [20, 270, 90, 270, 90, 490, 20, 490], color: "lightgreen", text: 'MBA002\n12', mz: 'M2' },
    { id: 3, points: [20, 510, 90, 510, 90, 730, 20, 730], color: "lightgreen", text: 'MBA003\n2', mz: 'M3' },
    { id: 4, points: [110, 113, 170, 113, 170, 333, 140, 335, 140, 360, 110, 360, 110, 113], color: 'yellow', text: 'MBA004', mz: 'M4' },
    { id: 5, points: [190, 113, 270, 113, 266, 270, 270, 420, 115, 420, 110, 380, 110, 360, 190, 360], color: 'lightgreen', text: 'MBA050\n66', mz: 'M5' },
    { id: 6, points: [115, 440, 270, 440, 270, 500, 115, 500], color: 'lightgreen', text: 'MBA054\n42', mz: 'M6' },
    { id: 7, points: [115, 520, 270, 520, 270, 570, 115, 570], color: 'lightgreen', text: 'MBA055\n41', mz: 'M7' },
    { id: 8, points: [115, 590, 270, 590, 270, 640, 115, 640], color: 'lightgreen', text: 'MBA056', mz: 'M8' },
    { id: 9, points: [115, 660, 270, 660, 255, 760, 120, 755, 118, 716, 220, 716, 220, 708, 118, 705, 115, 660], color: 'lightgreen', text: 'MBB036\n40', mz: 'M9' },
    { id: 11, points: [355, 113, 470, 113, 468, 200, 390, 200, 390, 210, 467, 210, 465, 320, 355, 320, 355, 113], color: 'lightgreen', text: 'MBA049\n46', mz: 'Mz G' },
    { id: 10, points: [295, 113, 355, 113, 355, 320, 295, 320, 295, 113], color: 'yellow', text: 'PETROPERÚ', mz: '' },
    { id: 12, points: [295, 337, 360, 337, 360, 377, 295, 377], color: 'lightgreen', text: 'MBA047\n17', mz: 'Mz C' },
    { id: 13, points: [370, 337, 470, 337, 470, 377, 370, 377], color: 'lightgreen', text: 'MBA048\n12', mz: 'Mz F' },
    { id: 14, points: [435, 337, 470, 337, 470, 377, 433, 377], color: 'yellow', text: '', mz: '' },
    { id: 15, points: [295, 392, 330, 392, 330, 437, 297, 437], color: 'lightgreen', text: 'MBA046\n5', mz: '' },
    { id: 16, points: [345, 392, 470, 392, 470, 437, 345, 437], color: 'lightgreen', text: 'MBA045\n19', mz: 'Mz D' },
    { id: 17, points: [435, 392, 470, 392, 470, 437, 433, 437], color: 'green', text: '', mz: 'Mz D' },
    { id: 18, points: [298, 452, 330, 452, 330, 500, 295, 500], color: 'lightgreen', text: 'MBA043\n6', mz: 'Mz A' },
    { id: 19, points: [345, 452, 470, 452, 470, 500, 345, 500], color: 'lightgreen', text: 'MBA044\n25', mz: 'Mz A' },
    { id: 20, points: [295, 520, 372, 520, 372, 640, 295, 640], color: 'lightgreen', text: 'MBA042\n17', mz: 'Mz 1' },
    { id: 21, points: [392, 520, 470, 520, 470, 640, 392, 640], color: 'lightgreen', text: 'MBA041\n26', mz: 'Mz 12' },
    { id: 22, points: [295, 660, 372, 660, 372, 760, 280, 760], color: 'lightgreen', text: 'MBB035\n26', mz: 'Mz 23' },
    { id: 23, points: [392, 660, 470, 660, 470, 760, 392, 760], color: 'lightgreen', text: 'MBB034\n32', mz: 'Mz 22' }
    // { id: 24, points: [], color: 'lightgreen', text: '', mz: '' },
];

const calles = [
    { id: 1, points: [-100, 100, 1500, 100], color: "gray", text: 'Av. Centenario', ancho: 25 },
    { id: 3, points: [10, 100, 10, 730], color: "gray", text: 'Jr. Los Frutales', ancho: 20 },
    { id: 4, points: [100, 100, 100, 730], color: 'gray', text: 'Av. Emancipación', ancho: 30 },
    { id: 5, points: [19, 240, 91, 240], color: 'gray', text: '', ancho: 68 },
    { id: 6, points: [19, 500, 91, 500], color: 'gray', text: '', ancho: 20 },
    { id: 7, points: [280, 100, 280, 642], color: 'gray', text: 'Av. Virgen de Fátima', ancho: 40 },
    { id: 8, points: [480, 100, 480, 1300], color: 'gray', text: 'Av. 21 de Junio', ancho: 30 },
    { id: 9, points: [180, 100, 180, 400], color: 'gray', text: 'Ps. Alicia', ancho: 80 },
    { id: 10, points: [110, 430, 272, 430], color: 'gray', text: 'Ps. Fortaleza', ancho: 20 },
    { id: 11, points: [110, 510, 272, 510], color: 'gray', text: 'Jr. 16 de Noviembre', ancho: 20 },
    { id: 12, points: [110, 580, 272, 580], color: 'gray', text: 'Jr. 27 de Mayo', ancho: 20 },
    { id: 13, points: [110, 650, 272, 650], color: 'gray', text: 'Jr. 27 de Febrero', ancho: 20 },
    { id: 14, points: [290, 445, 480, 445], color: 'gray', text: 'Ca. San Martin', ancho: 120 },
    { id: 15, points: [270, 510, 800, 510], color: 'gray', text: '', ancho: 20 },
    { id: 16, points: [270, 650, 800, 650], color: 'gray', text: '', ancho: 20 },
    { id: 17, points: [290, 384, 480, 384], color: 'gray', text: 'Ca. Jose Olaya', ancho: 60 },
    { id: 18, points: [290, 328, 480, 328], color: 'gray', text: 'Jr. Las Palmeras', ancho: 60 }
    // { id: 19, points: [], color: 'gray', text: '', ancho: 20 },
    // { id: 20, points: [], color: 'gray', text: '', ancho: 20 },
    // { id: 21, points: [], color: 'gray', text: '', ancho: 20 },
];


export default { manzanas, calles }
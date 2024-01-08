
import React, { useState, useEffect } from 'react';
export const ScaleOptions = [
    { value: 'Length', label: 'Measurement cm' },
    { value: 'Mass', label: 'weight kg' },
    { value: 'Color', label: 'color' }
]


export const BoolOption = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
]


export const habitatOptions = [
    { value: 'temperate', label: 'Terrestrial -> Forests -> Temperate' },
    { value: 'tropical', label: 'Terrestrial -> Forests -> Tropical' },
    { value: 'boreal', label: 'Terrestrial -> Forests -> Boreal' },
    { value: 'tropicalGrasslands', label: 'Terrestrial -> Grasslands -> Tropical grasslands' },
    { value: 'temperateGrasslands', label: 'Terrestrial -> Grasslands -> Temperate grasslands' },
    { value: 'hotDryDeserts', label: 'Terrestrial -> Deserts -> Hot and dry deserts' },
    { value: 'coastalDeserts', label: 'Terrestrial -> Deserts -> Coastal deserts' },
    { value: 'coldDeserts', label: 'Terrestrial -> Deserts -> Cold deserts' },
    { value: 'semiAridDeserts', label: 'Terrestrial -> Deserts -> Semi-arid deserts' },
    { value: 'marshes', label: 'Terrestrial -> Wetlands -> Marshes' },
    { value: 'ponds', label: 'Terrestrial -> Wetlands -> Ponds' },
    { value: 'swamps', label: 'Terrestrial -> Wetlands -> Swamps' },
    { value: 'peatBogs', label: 'Terrestrial -> Wetlands -> Peat Bogs' },
    { value: 'rivers', label: 'Aquatic -> Freshwater -> Rivers' },
    { value: 'lakes', label: 'Aquatic -> Freshwater -> Lakes' },
    { value: 'pelagicHabitats', label: 'Aquatic -> Marine -> Pelagic habitats' },
    { value: 'demersalHabitats', label: 'Aquatic -> Marine -> Demersal habitats' },
];
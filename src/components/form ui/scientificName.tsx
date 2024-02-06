import React, {useEffect, useState} from 'react';
import { getNestedValue } from '@/app/createSpecies/CreateSpeciesForm';

import {LabelAndTextInput} from "@/components/non form ui/LabelAndTextInput";
import {TaxonomyProps} from "../../../models/IntefacesAndOptions/interfaces";
import {LabelAndDropdownState} from "@/components/non form ui/LabelAndDropdownText";
import {spec} from "node:test/reporters";

interface ScientificNameFormProps {
    isInEdit: boolean;
    defValues: TaxonomyProps; // Adjust the type of defValues based on your requirement
    onTaxonomyChange: (value: TaxonomyProps) => void;
}

const ScientificNameForm: React.FC<ScientificNameFormProps>
    = ({
         isInEdit,
         defValues,
           onTaxonomyChange,
     }) => {

    const [domain, setDomain] = useState(defValues.domain || '');
    const [kingdom, setKingdom] = useState(defValues.kingdom || '');
    const [phylum, setPhylum] = useState(defValues.phylum || '');
    const [classVal, setClassVal] = useState(defValues.class || '');
    const [order, setOrder] = useState(defValues.order || '');
    const [family, setFamily] = useState(defValues.family || '');
    const [subfamily, setSubfamily] = useState(defValues.subfamily || '');
    const [genus, setGenus] = useState(defValues.genus || '');
    const [species, setSpecies] = useState(defValues.species || '');
    const [scientificName, setScientificName] = useState(defValues.scientificName || '');

    useEffect(() => {
        onTaxonomyChange(  {
            domain: domain,
            kingdom: kingdom,
            phylum: phylum,
            class: classVal,
            order: order,
            family: family,
            subfamily: subfamily,
            genus: genus,
            species: species,
            scientificName: scientificName,
        });
    }, [classVal, domain, family, genus, kingdom, order, phylum, scientificName, species, subfamily]);

    
    useEffect(() => {
        // Update form fields when defValues change
        if (isInEdit) {
            setDomain(defValues.domain || '');
            setKingdom(defValues.kingdom || '');
            setPhylum(defValues.phylum || '');
            setClassVal(defValues.class || '');
            setOrder(defValues.order || '');
            setFamily(defValues.family || '');
            setSubfamily(defValues.subfamily || '');
            setGenus(defValues.genus || '');
            setSpecies(defValues.species || '');
            setScientificName(defValues.scientificName || '');
            // console.log("inside pdf : ")
        } else {
            resetForm();
        }
    }, [isInEdit, defValues]);

    const resetForm = () => {
        setDomain('Eukaryote');
        setKingdom('');
        setPhylum('');
        setClassVal('');
        setOrder('');
        setFamily('');
        setSubfamily('');
        setGenus('');
        setSpecies('');
        setScientificName('');
    }

    const handleInputChange = (name: string, value: string) => {
        // Handle individual input changes here
        switch (name) {
            case 'domain':
                setDomain(value);
                break;
            case 'kingdom':
                setKingdom(value);
                break;
            case 'phylum':
                setPhylum(value);
                break;
            case 'class':
                setClassVal(value);
                break;
            case 'order':
                setOrder(value);
                break;
            case 'family':
                setFamily(value);
                break;
            case 'subfamily':
                setSubfamily(value);
                break;
            case 'genus':
                setGenus(value);
                setScientificName(value + `${species ? ' '+species : ''}`)
                break;
            case 'species':
                setSpecies(value);
                setScientificName(`${genus ? genus +' ' : ''}`+ value)
                break;
            case 'scientificName':
                setScientificName(value);
                break;
            default:
                break;
        }
        
    };


    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">

            <LabelAndTextInput
                label="Domain" value={domain}
                onChange={(value) => handleInputChange('domain', value)} // Add your logic for handling changes
            />

            {/* Kingdom */}
            <LabelAndTextInput
                label="Kingdom" value={kingdom}
                onChange={(value) => handleInputChange('kingdom', value)}
            />

            {/* Phylum */}
            <LabelAndTextInput
                label="Phylum" value={phylum}
                onChange={(value) => handleInputChange('phylum', value)}
            />

            {/* Class */}
            <LabelAndTextInput
                label="Class" value={classVal}
                onChange={(value) => handleInputChange('class', value)}
            />

            {/* Order */}
            <LabelAndTextInput
                label="Order" value={order}
                onChange={(value) => handleInputChange('order', value)}
            />

            {/* Family */}
            <LabelAndTextInput
                label="Family" value={family}
                onChange={(value) => handleInputChange('family', value)}
            />

            {/* Subfamily */}
            <LabelAndTextInput
                label="Subfamily" value={subfamily}
                onChange={(value) => handleInputChange('subfamily', value)}
            />

            {/* Genus */}
            <LabelAndTextInput
                label="Genus" value={genus}
                onChange={(value) => handleInputChange('genus', value)}
            />

            {/* Species */}
            <LabelAndTextInput
                label="Species" value={species}
                onChange={(value) => handleInputChange('species', value)}
            />

            {/* Scientific Name */}
            <LabelAndTextInput
                label="Scientific Name" value={scientificName}
                onChange={(value) => handleInputChange('scientificName', value)}
            />

        </div>
    );
};

export default ScientificNameForm;

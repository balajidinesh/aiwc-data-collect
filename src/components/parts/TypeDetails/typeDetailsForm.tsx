import React, { useState, useEffect } from 'react';
import { LabelAndTextInput } from "@/components/non form ui/LabelAndTextInput";
import {LabelAndDropdownState} from "@/components/non form ui/LabelAndDropdownText";
import {TypeDetailsProps} from "../../../../models/IntefacesAndOptions/interfaces";
import {ScaleOptions} from "../../../../models/IntefacesAndOptions/option";


export interface TypeDetailsFormProps {
    defValues: TypeDetailsProps;
    onEdit : boolean ;
    onAdd: (typeDetails: TypeDetailsProps) => void;
}


export const TypeDetailsForm: React.FC<TypeDetailsFormProps> = ({ onEdit , defValues, onAdd }) => {

    const [characterName, setCharacterName] = useState(defValues.characterName);
    const [scale, setScale] = useState(defValues.scale);
    const [value, setValue] = useState(defValues.value);

    useEffect(() => {
        // Update form fields when defValues change
        if (onEdit) {
            setCharacterName(defValues.characterName);
            setScale(defValues.scale);
            setValue(defValues.value);

            console.log("im")
            console.log(defValues);
        }else {
            resetForm();
        }

    }, [onEdit, defValues]);

    const resetForm = () => {
        setCharacterName('');
        setScale('');
        setValue('');
    };

    const handleAdd = () => {
        if (characterName && scale && value) {
            onAdd({ characterName, scale, value });

            resetForm();
        }

    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                <LabelAndTextInput label="Character Name" value={characterName} onChange={setCharacterName}/>
                <LabelAndDropdownState label={"Scale"} options={ScaleOptions} selectedValue={scale} onSelectChange={setScale}></LabelAndDropdownState>
                {/*<LabelAndTextInput label="Scale" value={scale} onChange={setScale} />*/}
                <LabelAndTextInput label="Value" value={value} onChange={setValue} />
            </div>
            <button
                className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-800"
                type="button"
                onClick={handleAdd}
            >
                {onEdit ? "Update" : "Add"}
            </button>
        </div>
    );
};



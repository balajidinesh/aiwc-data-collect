import React, { useState, useEffect } from 'react';
import { LabelAndTextInput } from "@/components/non form ui/LabelAndTextInput";
import {LabelAndDropdownState} from "@/components/non form ui/LabelAndDropdownText";
import {TypeDetailsProps} from "../../../../models/IntefacesAndOptions/interfaces";
import {ScaleOptions} from "../../../../models/IntefacesAndOptions/option";


export interface TypeDetailsFormProps {
    defValues: TypeDetailsProps;
    inState : boolean ;
    onAdd: (typeDetails: TypeDetailsProps) => void;
}


const TypeDetailsForm: React.FC<TypeDetailsFormProps> = ({ inState, defValues, onAdd }) => {

    const [characterName, setCharacterName] = useState(inState ? defValues.characterName : "");
    const [scale, setScale] = useState(inState ? defValues.scale : "");
    const [value, setValue] = useState(inState ? defValues.value : "");

    useEffect(() => {
        // Update form fields when defValues change
        if (inState) {
            setCharacterName(defValues.characterName);
            setScale(defValues.scale);
            setValue(defValues.value);
        }
    }, [defValues]);

    const handleAdd = () => {
        if (characterName && scale && value) {
            onAdd({ characterName, scale, value });
            setCharacterName('');
            setScale('');
            setValue('');
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
                {inState ? "Update" : "Add"}
            </button>
        </div>
    );
};

export default TypeDetailsForm;

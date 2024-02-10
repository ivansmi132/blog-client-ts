import {Control, Controller} from "react-hook-form";
import TextArea from "antd/lib/input/TextArea";

export function ControlledTextArea({name, control}: {name: string, control: Control<any>}) {
    return (
        <Controller
            control={control}
            name={name}
            render={( {field: {onChange, value} }) => (
                <>
                    <label htmlFor={name}>{name}</label>
                    <TextArea id={name} autoSize={ { minRows: 2 } } onChange={onChange} value={value}></TextArea>
                </>
            )}
        />
    )

}
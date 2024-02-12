import {Control, Controller} from "react-hook-form";
import TextArea from "antd/lib/input/TextArea";
import capitalize from "antd/lib/_util/capitalize";

interface ControlledTextAreaProps {
    name: string,
    control: Control<any>,
    maxLength: number
}
/*
This is the way to integrate external controlled component with react-hook-form
for documentation, see: https://react-hook-form.com/docs/usecontroller/controller
 */
export function ControlledTextArea({name, control, maxLength}: ControlledTextAreaProps) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: `${name} field is required!`,
            }}
            render={(
                {field: {onChange, value, name},
                    formState: {errors}}) => (
                <>
                    <label htmlFor={name}
                           style={errors[name] && {color: "red"}}>
                        {capitalize(name)}
                    </label>
                    <TextArea id={name}
                              autoSize={{ minRows: 2 }}
                              onChange={onChange}
                              value={value}
                              maxLength={maxLength}
                              showCount
                              status={errors[name] ? 'error' : ''}
                    />
                    {errors[name] &&
                        <p style={{color:"red"}}>
                            {`${errors[name]?.message}`}
                        </p>}
                </>
            )}
        />
    )

}
import {Control, Controller} from "react-hook-form";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";

export function ControlledUploadImage({control, image_url}: {control: Control<any>, image_url?: string}) {
    const [image, setImage] = useState(image_url);
    return (
        <Controller
            control={control}
            name="image"
            render={( {field: {onChange, value} }) => (
                <>
                    <Upload name='image'
                            onChange={onChange}
                            onRemove={() => setImage("")}
                            maxCount={1}
                            beforeUpload={(file) => {
                                setImage(URL.createObjectURL(file));
                                return false}}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    {image && <img src={image} width={200} alt='preview'/>}
                </>
            )}
        />
    )

}
import {Control, Controller} from "react-hook-form";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Image} from 'antd';

export function ControlledUploadImage({control, image_url}: {control: Control<any>, image_url?: string}) {
    const [previewImage, setPreviewImage] = useState(image_url);
    return (
        <Controller
            control={control}
            name="image"
            render={( {field: {onChange, value} }) => (
                <>
                    <Upload name='image'
                            onChange={onChange}
                            onRemove={() => setPreviewImage("")}
                            maxCount={1}
                            beforeUpload={(file) => {
                                setPreviewImage(URL.createObjectURL(file));
                                return false}}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    {previewImage && <Image src={previewImage} width={200} alt='preview'/>}
                </>
            )}
        />
    )

}
import {Control, Controller} from "react-hook-form";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {Image} from 'antd';

interface ControlledUploadImageProps {
    control: Control<any>,
    image_url?: string,
}

/*
This is the way to integrate external controlled components with react-hook-form
for documentation, see: https://react-hook-form.com/docs/usecontroller/controller
 */
export function ControlledUploadImage({control, image_url} :ControlledUploadImageProps) {
    const [previewImage, setPreviewImage] = useState(image_url);

    return (
        <Controller
            control={control}
            name="image"
            render={( {field: {onChange, value} }) => (
                <div className="image-upload-container">
                    <Upload name='image'
                            onChange={onChange}
                            onRemove={() => setPreviewImage("")}
                            maxCount={1}
                            beforeUpload={(file) => {
                                setPreviewImage(URL.createObjectURL(file));
                                // we return false to ignore the default xhr request of Upload
                                return false}}>

                        <Button className="upload-button" icon={<UploadOutlined />}>
                            Upload Image (Optional)
                        </Button>
                    </Upload>

                    {previewImage &&
                        <div>
                            <p>Preview:</p>
                            <Image src={previewImage}
                                   width={200}
                                   alt='preview'/>
                        </div>
                    }
                </div>
            )}
        />
    )

}
import {Button, Card, Flex, Typography} from "antd";
import React from "react";

export function PostCard() {
    return (
        <Card style={{ maxWidth: 900, maxHeight:250, border: "1px solid #9E2B25", margin:"auto"}}>
            <Flex justify="space between">
                <img src="https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg" alt="example" style={{display: "block", width: 273, maxHeight: 200}}/>
                <Flex gap="large" vertical align="flex-end" justify="space-between" style={{padding: 20}}>
                    <Typography.Title style={{height: "100%"} } level={3}>
                        “antd is an enterprise-class UI design language and React UI library.”
                    </Typography.Title>
                    <Button type="primary" href="https://ant.design" target="_blank">
                        Read More
                    </Button>
                </Flex>
            </Flex>
        </Card>
    )
}
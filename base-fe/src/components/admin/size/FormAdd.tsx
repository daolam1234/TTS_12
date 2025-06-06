import React from "react";
import { Button, Card, Form, Input } from "antd";
function FormAddSize() {
    return (
 <div className="min-h-screen relative h-full w-full dark:bg-slate-1000 flex justify-center ">
                    {/* Form thêm kích thước */}
                   
                        <Form  
                        style={{ width: '100%', maxWidth: 1700, height:700, marginTop: 24,  }}
                      
                         layout="vertical">
                            <Form.Item
                                label="Tên kích thước"
                                name="name"
                                rules={[{ required: true, message: "Vui lòng nhập tên kích thước!" }]}
                            >
                                <Input placeholder="VD: S, M, L, XL..." />
                            </Form.Item>

                            <Form.Item  className="text-right">
                                <Button
                                    type="primary"
                                    style={{ backgroundColor: "#5A67D8", color: "white" }}
                                >
                                    Thêm
                                </Button>
                            </Form.Item>
                        </Form>
                    
                </div>

    )

}
    export default FormAddSize;
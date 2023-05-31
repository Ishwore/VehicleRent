import React from 'react'
import { useState, Fragment } from "react";
import { Alert, Button } from "@material-tailwind/react";

const Message = ({ variant, children }) => {
    const [open, setOpen] = useState(true);

    return (
        <Fragment>
            {!open && (
                <Button className="absolute" onClick={() => setOpen(true)}>
                    Show Alert
                </Button>
            )}
            <Alert variant={variant} open={open} onClose={() => setOpen(false)}>
                {children}
            </Alert>
        </Fragment>
    )
}

Message.defaultProps = {
    variant: 'info',
}

export default Message

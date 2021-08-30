import React, { useState, KeyboardEvent } from 'react';
import {TextField, Button} from "@material-ui/core";


export function ChatMessage() {
    const [inputValue, setInputValue] = useState("");

    const sendMessage = () =>{
        console.log(`Sent message: ${inputValue}` );
        setInputValue("");
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    const styles : React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    };
    const fieldStyle : React.CSSProperties = {
        width: '70%'
    };
    const btnStyles : React.CSSProperties = {
        marginLeft: 25
    };

    return (
        <div style={styles}>
                <TextField
                    label="Write message here.."
                    fullWidth={true}
                    style={fieldStyle}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                />
                <Button style={btnStyles} onClick={sendMessage} > Send </Button>
            </div>
    );
}
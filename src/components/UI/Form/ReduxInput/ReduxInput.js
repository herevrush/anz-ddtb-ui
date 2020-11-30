import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import React from "react";
import { Field } from "redux-form";

const renderTextField = ({
    input,
    label,
    meta: { touched, invalid, error },
    ...custom
}) => (
        <TextField
            fullWidth
            margin="none"
            variant="outlined"
            label={label}
            size="small"
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return <FormHelperText>{error}</FormHelperText>;
    }
};

const renderSelectField = ({
    input,
    label,
    meta: { touched, invalid, error },
    children,
    ...custom
}) => (
        <FormControl fullWidth variant="outlined" error={touched && invalid}>
            <Select
                fullWidth
                {...input}
                label={label}
                children={children}
                size="small"
                {...custom}
                inputProps={{
                    name: input.name,
                    id: input.name,
                }}
            />
            {renderFromHelper({ touched, error })}
        </FormControl>
    );

const getTextInput = (props) => {
    return (
        <Field
            name={props.name}
            component={renderTextField}
            label={props.label}
            disabled={props.disabled}
            {...{ type: props.inputType ? props.inputType : "string" }}
        />
    );
};

const getSelectInput = (props) => {
    return (
        <Field
            name={props.name}
            component={renderSelectField}
            label={props.label}
            size="small"
        >
            {props.options.map((type) => {
                return (
                    <MenuItem key={type.value} value={type.value}>
                        {type.name}
                    </MenuItem>
                );
            })}
        </Field>
    );
};


export const ReduxInput = (props) => {
    let inputElem = null;
    switch (props.type) {
        case "select":
            inputElem = getSelectInput(props);
            break;
        default:
            inputElem = getTextInput(props);
            break;
    }
    return (
        <FormControl fullWidth variant="outlined">
            {inputElem}
        </FormControl>
    );
};

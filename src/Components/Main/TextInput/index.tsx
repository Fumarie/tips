import React, {FC, useState} from 'react';
import classes from "./TextInput.module.css";
import {useDispatch, useSelector} from "react-redux";
import {clearEditError, editUser} from "../../../redux/userSlice";
import {RootState} from "../../../redux/store";
import editIcon from "./Edit.svg"
import submitIcon from "./Submit.svg"
import cancelIcon from "./Close.svg"

interface TextInputProps {
    text: string | null
    name?: 'name' | 'email' | 'fullName'
    editable?: boolean
}

let prevValue: string | null = ''

const TextInput: FC<TextInputProps> = ({text, name, editable}) => {
    const dispatch = useDispatch()
    const {id} = useSelector((state: RootState) => state.auth)
    const {editLoading, editError} = useSelector((state: RootState) => state.user)
    const [value, setValue] = useState(text)
    const [edit, setEdit] = useState<boolean>(false)


    const sendRequest = async () => {
        setEdit(false)
        if (id && name && value) {
            await dispatch(editUser({id: id, value: {[value]: value}, fieldName: name}))
        }
    }

    const cancelEdit = () => {
        setValue(prevValue ? prevValue : text)
        setEdit(false)
    }

    const editHandler = () => {
        dispatch(clearEditError(name))
        prevValue = value
        setEdit(true)
    }

    let errorHere = false
    let error
    if (name && editError.errors) {
        errorHere = Object.keys(editError.errors).includes(name)
        error = editError.errors[`${name}`]
    }

    return (
        <div className={classes.input}>
            {!editLoading[`${name}`] ?
                <>
                    {editable && errorHere ?
                        <input style={{color: 'red'}} type="text" readOnly value={error ? error : 'Edit error'}/>
                        :
                        <input type="text" readOnly={!edit}
                               onChange={(event) => setValue(event.target.value)}
                               value={value ? value : ''}/>
                    }
                    {editable && !edit && <button onClick={editHandler}><img src={editIcon} alt="edit"/></button>}
                    {editable && edit &&
                    <div style={{display: "flex"}}>
                        <button onClick={cancelEdit}>
                            <img style={{width: '24px', height: '24px'}} src={cancelIcon} alt="cancel"/>
                        </button>
                        {value &&
                            <button style={{marginLeft: '5px'}} disabled={!value} onClick={sendRequest}>
                                <img style={{width: '24px', height: '24px'}} src={submitIcon} alt="submit"/>
                            </button>
                        }
                    </div>

                    }
                </>
                : <input type="text" readOnly value={'Loading...'}/>
            }
        </div>
    );
};

export default TextInput;

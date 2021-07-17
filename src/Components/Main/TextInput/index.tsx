import React, {FC, useState} from 'react';
import classes from "./TextInput.module.css";
import {useDispatch, useSelector} from "react-redux";
import {clearEditError, editUser, getUser} from "../../../redux/userSlice";
import {RootState} from "../../../redux/store";
import editIcon from "./Edit.svg"

interface TextInputProps {
    text: string | null
    name?: 'name' | 'email' | 'fullName'
    editable?: boolean
}

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

    const editHandler = () => {
        dispatch(clearEditError(name))
        setEdit(true)
    }

    let errorHere = false
    let error
    if(name && editError.errors) {
        errorHere = Object.keys(editError.errors).includes(name)
        error = editError.errors[`${name}`]
    }

    return (
        <div className={classes.input}>
            {!editLoading[`${name}`] ?
                <>
                    {editable && errorHere ?
                        <input type="text" readOnly value={error ? error : 'Edit error'}/>
                        :
                        <input type="text" readOnly={!edit}
                               onChange={(event) => setValue(event.target.value)}
                               value={value ? value : ''}/>
                    }
                    {editable && !edit && <button onClick={editHandler}><img src={editIcon} alt="edit"/></button>}
                    {editable && edit && <button disabled={!value} onClick={sendRequest}>send</button>}
                </>
                : <input type="text" readOnly value={'Loading...'}/>
            }
        </div>
    );
};

export default TextInput;

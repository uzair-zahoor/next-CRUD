import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material'
import FormModal from '../form-modal-components/form-modal'

const Form = () => {
    const [addForm, setAddForm] = useState(false)
  return (
    <div>
      <h2>Hello From Form Modal</h2>
      <Button sx={{ margin: 2 }} variant='contained' onClick={() => {
        setAddForm(true)
      }}>Add User</Button>
      {addForm ? <FormModal formModal={addForm} setFormModal={setAddForm}  /> : null}
    </div>
  )
}

export default Form

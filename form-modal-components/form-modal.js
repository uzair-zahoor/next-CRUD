import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField, Grid, FormLabel, Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useForm, Controller } from 'react-hook-form'
import CountrySelect from './select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "6px",
    p: 3,
    border: "none"
};
const inp = {
    width: "520px"
}
const lab={
    fontSize: '14px',
    marginRight: '15px'
}

export default function FormModal({ formModal, setFormModal, onData }) {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setFormModal(false);
    };
    function onSubmit(data) {
        console.log(data);
        setFormModal(false);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h5' sx={{width: "100%", textAlign: "center", marginBottom: "15px"}}>Registeration Form</Typography>
                        <Grid container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
                          
                            <Grid marginY={1} item display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
                                <FormLabel sx={lab}>Name:  </FormLabel>
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{ required: true}}
                                    render={({ field }) => (
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            error={!!errors?.name}
                                            helperText={errors.name? "Name is required": null }
                                            size='small'
                                            sx={inp}
                                            {...field}
                                        />
                                    )} />
                            </Grid>
                            <Grid marginY={1} item display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
                                <FormLabel sx={lab}>Father Name:  </FormLabel>
                                <Controller
                                    control={control}
                                    name="fname"
                                    render={({ field }) => (
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size='small'
                                            sx={inp}
                                            {...field}
                                        />
                                    )} />
                            </Grid>
                            <Grid marginY={1} item display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
                                <FormLabel sx={lab}>Email:  </FormLabel>
                                <Controller
                                    control={control}
                                    name="email"
                                    rules={{ pattern: /^\S+@\S+\.\S+$/, required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            error={!!errors?.email}
                                            helperText={errors.email? "Email is required and must contain '@' and '.'": null }
                                            size='small'
                                            // fullWidth
                                            sx={inp}
                                            {...field}
                                        />
                                    )} />

                            </Grid>
                            <Grid marginY={1} item display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
                                <FormLabel sx={lab}>Date of Birth:  </FormLabel>
                                <Controller
                                    control={control}
                                    name="dob"
                                    render={({ field }) => (
                                        <TextField
                                            id='date'
                                            type="date"
                                            variant="outlined"
                                            fullWidth
                                            size='small'
                                            sx={inp}
                                            {...field}
                                        />
                                    )} />
                            </Grid>
                            <Grid marginY={1} item display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
                    <FormLabel sx={lab}>Country:  </FormLabel>
                    <Controller
                      control={control}
                      name="country"
                      render={({ field: { onChange, value } }) => (
                        <CountrySelect value={value} onChange={onChange} />
                      )} />
                  </Grid>
                            <Grid marginY={2} item display={'flex'} flexDirection={'row'} justifyContent={'right'} alignItems={'flex-start'} xs={12}>
                                <Button variant='contained' sx={{ marginX: "8px" }} onClick={() => setFormModal(false)}>Cancel</Button>
                                <Button type='submit' variant='contained' color='success' sx={{ width: "120px" }}>Submit</Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

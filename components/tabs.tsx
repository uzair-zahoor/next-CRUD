import * as React from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@mui/system';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Paper, Button } from '@mui/material';
import { TextField, FormLabel, FormControlLabel, FormGroup, Checkbox, RadioGroup, Radio } from "@mui/material";
import CountrySelect from './select';
import { Controller, useForm } from 'react-hook-form';
const UserLoc = dynamic(() => import('./userloc'), { ssr: false });
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export interface Input{
  sname: string;
  fname: string;
  email: string;
  contact: string;
  dob: string;
  gender: string;
  message: string;
  country: any;
  skills: any;
  location: any;
}
interface Props{
  onData: (data: Input) => void;
  prefill?: Input;
}

export default function BasicTabs({onData, prefill } :Props):JSX.Element {
  // console.log(props);
  const { handleSubmit, control, formState: { errors }, reset } = useForm<Input>();
  const [value, setValue] = React.useState(0);
  const onSubmit = (data: Input) => {
    if (data) {
      console.log("Data", data);
      try {
   
        onData(data);
        reset({
          sname: "",
          fname: "",
          email: "",
          contact: "",
          dob: "",
          gender: "",
          message: "",
          skills: "",
        });
      } catch (error) {
        // console.log(error.message);
      }

    }
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const skills = [
    "HTML", "CSS", "JavaScript", "ReactJS", "Redux", "NodeJS", "ExpressJS", "MongoDB",
  ];
  return (
    <Container className='contain'>
      <Paper elevation={8}>
        <Grid container spacing={3} sx={{ backgroundColor: "rgb(244, 244, 244)", marginY: 1, borderRadius: 2, padding: 1 }}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Information" {...a11yProps(0)} />
                <Tab label="Location" {...a11yProps(1)} />
                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanel value={value} index={0}>
                {/* <Container> */}
                <Grid container spacing={1}>
                  <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">Information</Typography>
                  </Grid>
                  {/* Name Field */}
                  <Grid item display={'flex'} flexDirection={'row'} justifyContent={'right'} alignItems={'flex-start'} xs={12} sx={{}}>
                    <FormLabel className='label'>Name: </FormLabel>
                    <Controller
                      control={control}
                      name="sname"
                      defaultValue={prefill?.sname || ""}
                      rules={{ required: true, minLength: 3, maxLength: 20 }}
                      render={({ field }) => (
                        <TextField
                          id="outlined-basic"
                          // label="Name"
                          error={!!errors?.sname}
                          helperText={errors.sname ? `${errors.sname.message} String Should be between 3 and 20 characters` : "String Should be between 3 and 20 characters"}
                          variant="outlined"
                          size='small'
                          // fullWidth
                          className='input'
                          {...field}
                        />
                      )}
                    />

                  </Grid>
                  {/* Father Name Field */}
                  <Grid item display={'flex'} flexDirection={'row'} justifyContent={'right'} alignItems={'flex-start'} xs={12} sx={{}}>
                    <FormLabel className='label'>FatherName:  </FormLabel>
                    <Controller
                      control={control}
                      name="fname"
                      defaultValue={prefill?.fname || ""}
                      rules={{ minLength: 3, maxLength: 20 }}
                      render={({ field }) => (
                        <TextField
                          id="outlined-basic"
                          // label="Father Name"
                          variant="outlined"
                          size='small'
                          error={!!errors?.fname}
                          helperText={"String Should be between 3 and 20 characters"}
                          // fullWidth
                          className='input'
                          {...field}
                        />
                      )} />
                  </Grid>
                  {/* email Field */}
                  <Grid item display={'flex'} flexDirection={'row'} justifyContent={'right'} alignItems={'flex-start'} xs={12} sx={{}}>
                    <FormLabel className='label'>Email:  </FormLabel>
                    <Controller
                      control={control}
                      name="email"
                      defaultValue={prefill?.email || ""}
                      rules={{ pattern: /^\S+@\S+\.\S+$/, required: true }}
                      render={({ field }) => (
                        <TextField
                          id="outlined-basic"
                          error={!!errors?.email}
                          helperText={errors.email ? `${errors.email.message}` : "Must contain @ and . symbols"}
                          variant="outlined"
                          size='small'
                          // fullWidth
                          className='input'
                          {...field}
                        />
                      )} />

                  </Grid>
                  {/* contact Field */}
                  <Grid item display={'flex'} flexDirection={'row'} justifyContent={'right'} alignItems={'flex-start'} xs={12} sx={{}}>
                    <FormLabel className='label'>Contact:  </FormLabel>
                    <Controller
                      control={control}
                      name="contact"
                      defaultValue={prefill?.contact || ""}
                      rules={{ pattern: /^\d{11}$/ }}
                      render={({ field }) => (
                        <TextField
                          id="outlined-basic"
                          // name='contact'
                          error={!!errors?.contact}
                          helperText={'Must be 11 digits'}
                          variant="outlined"
                          size='small'
                          // fullWidth
                          className='input'
                          {...field}
                        />
                      )} />
                  </Grid>
                  {/* dob Field */}
                  <Grid item display={'flex'} justifyContent={'right'} alignItems={'center'} xs={12} sx={{}}>
                    <FormLabel className='label'>Date of Birth:  </FormLabel>
                    <Controller

                      control={control}
                      name="dob"
                      defaultValue={prefill?.dob || ""}
                      render={({ field }) => (
                        <TextField
                          id='date'
                          // name='dob'
                          type="date"
                          variant="outlined"
                          size='small'
                          // fullWidth
                          className='input'
                          InputLabelProps={{
                            shrink: true,
                          }}
                          {...field}
                        />
                      )} />

                  </Grid>
                  {/* gender field */}
                  <Grid item display={'flex'} justifyContent={'right'} alignItems={'center'} xs={12} sx={{}}>
                    {/* <FormControl> */}
                    <FormLabel className='label'>Gender: </FormLabel>
                    <Controller
                      control={control}
                      defaultValue={prefill?.gender || ""}
                      name="gender"
                      render={({ field }) => (
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          // name="gender"
                          className='input'
                          {...field}
                        >
                          <FormControlLabel value="Female" control={<Radio />} label="Female" />
                          <FormControlLabel value="Male" control={<Radio />} label="Male" />
                          <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                      )} />
                    {/* </FormControl> */}
                  </Grid>
                  {/* country field */}
                  <Grid item display={'flex'} justifyContent={'right'} alignItems={'center'} xs={12} sx={{}}>
                    <FormLabel className='label'>Country:  </FormLabel>
                    <Controller
                      control={control}
                      name="country"
                      defaultValue={prefill?.country || null}
                      render={({ field: { onChange, value } }) => (
                        <CountrySelect value={value} onChange={onChange} />
                      )} />
                  </Grid>
                  {/* message Field */}
                  <Grid item display={'flex'} justifyContent={'right'} alignItems={'center'} xs={12} sx={{}}>
                    <FormLabel className='label'>Message:  </FormLabel>
                    <Controller
                      control={control}
                      defaultValue={prefill?.message || ""}
                      name="message"
                      render={({ field }) => (
                        <TextField
                          id="outlined-basic"
                          // label="Message"
                          variant="outlined"
                          size='small'
                          className='input'
                          {...field}
                        />
                      )} />

                  </Grid>
                  {/* skill field */}
                  <Grid item display={'flex'} justifyContent={'right'} alignItems={'center'} xs={12} sx={{}}>
                    {/* <FormControl> */}
                    <FormLabel className='label'>Skills: </FormLabel>
                    <Controller
                      control={control}
                      name="skills"
                      // defaultValue={[]}
                      defaultValue={prefill?.skills || ''}
                      render={({ field: { onChange, value = [] } }) => (
                        <FormGroup className='input' sx={{ display: 'flex', flexDirection: 'row' }}>
                          {skills.map((skill) => (
                            <FormControlLabel
                              key={skill}
                              control={<Checkbox checked={value.includes(skill)} onChange={(e) => {
                                const option = skill;
                                const values = [...value];
                                if (e.target.checked) {
                                  values.push(option);
                                } else {
                                  const index = values.indexOf(option);
                                  if (index > -1) {
                                    values.splice(index, 1);
                                  }
                                }
                                onChange(values);
                              }} />}
                              label={skill}
                            />
                          ))}
                        </FormGroup>
                      )}
                    />
                    {/* </FormControl> */}
                  </Grid>
       
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} >
                <Grid>
                  <Controller
                    name="location"
                    control={control}
                    defaultValue={prefill?.location || null}
                    rules={{ required: true }}
                    render={({ field: { onChange, value} }) => (
                      <UserLoc value={value} onChange={onChange} />
                    )}
                  />
                </Grid>
              </TabPanel>
              <Grid item display={'flex'} justifyContent={'right'} alignItems={'flex-end'} xs={12} sx={{ marginY: 1 }}>
                <Button type='submit' variant="contained" color="success" sx={{ marginX: 3, width: '300px', height: 45 }} size='small'>
                  Submit
                </Button>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
}

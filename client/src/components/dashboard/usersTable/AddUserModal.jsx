// import React, {useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Container from "@material-ui/core/Container";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Avatar from "@material-ui/core/Avatar";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import {isEmpty} from "lodash";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
// import Box from "@material-ui/core/Box";
// import Copyright from "../../../Copyright";
// import {createAccount} from "../../../../actions/loginAction";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         height: 300,
//         flexGrow: 1,
//         minWidth: 300,
//         transform: 'translateZ(0)',
//         // The position fixed scoping doesn't work in IE 11.
//         // Disable this demo to preserve the others.
//         '@media all and (-ms-high-contrast: none)': {
//             display: 'none',
//         },
//     },
//     modal: {
//         display: 'flex',
//         padding: theme.spacing(1),
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
//     formPaper: {
//         marginTop: theme.spacing(4),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(3),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
//     formControl: {
//         minWidth: 120,
//         width: '100%',
//     },
// }));
//
// const AddUserModal = ({dispatch, open, closeModal}) => {
//     const classes = useStyles();
//     const rootRef = React.useRef(null);
//
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [phone, setPhone] = useState('');
//     const [gender, setGender] = useState('');
//     const [errorMessage, setErrorMessage] = useState(null);
//
//     const onFirstNameChange = firstName => {
//         // TODO: validate
//         // TODO: set error message if needed
//         setFirstName(firstName);
//     };
//
//     const onLastNameChange = lastName => {
//         // TODO: validate
//         // TODO: set error message if needed
//         setLastName(lastName);
//     };
//
//     const onEmailChange = email => {
//         // TODO: validate
//         // TODO: set error message if needed
//         setEmail(email);
//     };
//
//     const onPasswordChange = password => {
//         // TODO: validate
//         // TODO: set error message if needed
//         setPassword(password);
//     };
//
//     const onConfirmPasswordChange = confirmPassword => {
//         // TODO: validate
//         // TODO: set error message if needed
//         setConfirmPassword(confirmPassword);
//     };
//
//     const onPhoneChange = phone => {
//         // TODO: validate
//         // TODO: set error message if needed
//         setPhone(phone);
//     };
//
//     const onGenderChange = gender => {
//         // TODO: validate
//         // TODO: set error message if needed
//         setGender(gender);
//     };
//
//     const createAccountAction = async event => {
//         event.preventDefault();
//         const user = {
//             firstName, lastName, password, email, gender, phone
//         }
//         dispatch(createAccount(user));
//     };
//
//     return (
//         <div className={classes.root} ref={rootRef}>
//             <Modal
//                 disablePortal
//                 disableEnforceFocus
//                 disableAutoFocus
//                 open
//                 aria-labelledby="server-modal-title"
//                 aria-describedby="server-modal-description"
//                 className={classes.modal}
//                 container={() => rootRef.current}
//             >
//                 <Container component="main" maxWidth="xs">
//                     <CssBaseline />
//                     <div className={classes.formPaper}>
//                         <Avatar className={classes.avatar}>
//                             <LockOutlinedIcon />
//                         </Avatar>
//                         <Typography component="h1" variant="h5">
//                             Sign up
//                         </Typography>
//                         <form className={classes.form}>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField
//                                         autoComplete="fname"
//                                         name="firstName"
//                                         variant="outlined"
//                                         required
//                                         fullWidth
//                                         id="firstName"
//                                         label="First Name"
//                                         autoFocus
//                                         value={firstName}
//                                         onChange={event => onFirstNameChange(event.target.value)}
//                                         error={!isEmpty(errorMessage)} // TODO
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField
//                                         variant="outlined"
//                                         required
//                                         fullWidth
//                                         id="lastName"
//                                         label="Last Name"
//                                         name="lastName"
//                                         autoComplete="lname"
//                                         value={lastName}
//                                         onChange={event => onLastNameChange(event.target.value)}
//                                         error={!isEmpty(errorMessage)} // TODO
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         required
//                                         fullWidth
//                                         id="email"
//                                         label="Email Address"
//                                         name="email"
//                                         autoComplete="email"
//                                         value={email}
//                                         onChange={event => onEmailChange(event.target.value)}
//                                         error={!isEmpty(errorMessage)} // TODO
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         required
//                                         fullWidth
//                                         name="password"
//                                         label="Password"
//                                         type="password"
//                                         id="password"
//                                         value={password}
//                                         onChange={event => onPasswordChange(event.target.value)}
//                                         error={!isEmpty(errorMessage)} // TODO
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         required
//                                         fullWidth
//                                         name="confirm-password"
//                                         label="Confirm password"
//                                         type="password"
//                                         id="confirm-password"
//                                         value={confirmPassword}
//                                         onChange={event => onConfirmPasswordChange(event.target.value)}
//                                         error={!isEmpty(errorMessage)} // TODO
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         variant="outlined"
//                                         required
//                                         fullWidth
//                                         name="phone"
//                                         label="Phone"
//                                         type="phone"
//                                         id="phone"
//                                         autoComplete="phone"
//                                         value={phone}
//                                         onChange={event => onPhoneChange(event.target.value)}
//                                         error={!isEmpty(errorMessage)} // TODO
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <FormControl variant="outlined" className={classes.formControl}>
//                                         <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
//                                         <Select
//                                             labelId="create-account-gender-label"
//                                             id="create-account-gender"
//                                             value={gender}
//                                             onChange={event => onGenderChange(event.target.value)}
//                                             error={!isEmpty(errorMessage)} // TODO
//                                             label="Gender"
//                                         >
//                                             <MenuItem value="">
//                                                 <em>None</em>
//                                             </MenuItem>
//                                             <MenuItem value={'Male'}>Male</MenuItem>
//                                             <MenuItem value={'Female'}>Female</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                                 className={classes.submit}
//                                 onClick={createAccountAction}
//                             >
//                                 Sign Up
//                             </Button>
//                             <Grid container justify="center">
//                                 <Grid item>
//                                     <Link href="/login" variant="body2">
//                                         Already have an account? Sign in
//                                     </Link>
//                                 </Grid>
//                             </Grid>
//                         </form>
//                     </div>
//                     <Box mt={5}>
//                         <Copyright />
//                     </Box>
//                 </Container>
//             </Modal>
//         </div>
//     );
// };
//
// export default AddUserModal;
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import PaymentIcon from '@material-ui/icons/Payment';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#3f51b5",
        width: 50,
        height: 50
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    formControl: {
        width: '100%',
    },
    select: {
        width: "min-content"
    }
}));

// TODO: VALIDATION !!!

const Payment = ({user}) => {
    const classes = useStyles();

    // let bt_instance;
    // const [clientToken, setClientToken] = useState('576587648645');


    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [street, setStreet] = useState('');
    // const [city, setCity] = useState('');
    // const [phone, setPhone] = useState('');
    // const [floor, setFloor] = useState('');
    // const [errorMessage, setErrorMessage] = useState(null);
    //
    // const onFirstNameChange = firstName => {
    //     // TODO: validate
    //     // TODO: set error message if needed
    //     setFirstName(firstName);
    // };
    //
    // const onLastNameChange = lastName => {
    //     // TODO: validate
    //     // TODO: set error message if needed
    //     setLastName(lastName);
    // };
    //
    // const onStreetChange = street => {
    //     // TODO: validate
    //     // TODO: set error message if needed
    //     setStreet(street);
    // };
    //
    // const onCityChange = city => {
    //     // TODO: validate
    //     // TODO: set error message if needed
    //     setCity(city);
    // };
    //
    // const onPhoneChange = phone => {
    //     // TODO: validate
    //     // TODO: set error message if needed
    //     setPhone(phone);
    // };
    //
    // const onFloorChange = floor => {
    //     // TODO: validate
    //     // TODO: set error message if needed
    //     setFloor(floor);
    // };
    //
    // const createAccountAction = async event => {
    //
    // };

    return (
        <Container component="main">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PaymentIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Payment
                </Typography>
                <form className={classes.form}>
                    {/*//             <Grid container spacing={2}>*/}
                    {/*//                 <Grid item xs={12} sm={6}>*/}
                    {/*//                     <TextField*/}
                    {/*//                         autoComplete="fname"*/}
                    {/*//                         name="firstName"*/}
                    {/*//                         variant="outlined"*/}
                    {/*//                         required*/}
                    {/*//                         fullWidth*/}
                    {/*//                         id="firstName"*/}
                    {/*//                         label="First Name"*/}
                    {/*//                         autoFocus*/}
                    {/*//                         value={firstName || user.firstName}*/}
                    {/*//                         onChange={event => onFirstNameChange(event.target.value)}*/}
                    {/*//                         error={!isEmpty(errorMessage)} // TODO*/}
                    {/*//                     />*/}
                    {/*//                 </Grid>*/}
                    {/*//                 <Grid item xs={12} sm={6}>*/}
                    {/*//                     <TextField*/}
                    {/*//                         variant="outlined"*/}
                    {/*//                         required*/}
                    {/*//                         fullWidth*/}
                    {/*//                         id="lastName"*/}
                    {/*//                         label="Last Name"*/}
                    {/*//                         name="lastName"*/}
                    {/*//                         autoComplete="lname"*/}
                    {/*//                         value={lastName || user.lastName}*/}
                    {/*//                         onChange={event => onLastNameChange(event.target.value)}*/}
                    {/*//                         error={!isEmpty(errorMessage)} // TODO*/}
                    {/*//                     />*/}
                    {/*//                 </Grid>*/}
                    {/*//                 <Grid item xs={12} sm={6}>*/}
                    {/*//                     <TextField*/}
                    {/*//                         variant="outlined"*/}
                    {/*//                         required*/}
                    {/*//                         fullWidth*/}
                    {/*//                         id="street"*/}
                    {/*//                         label="Street"*/}
                    {/*//                         name="street"*/}
                    {/*//                         autoComplete="street"*/}
                    {/*//                         value={street}*/}
                    {/*//                         onChange={event => onStreetChange(event.target.value)}*/}
                    {/*//                         error={!isEmpty(errorMessage)} // TODO*/}
                    {/*//                     />*/}
                    {/*//                 </Grid>*/}
                    {/*//                 <Grid item xs={12} sm={6}>*/}
                    {/*//                     <TextField*/}
                    {/*//                         variant="outlined"*/}
                    {/*//                         required*/}
                    {/*//                         fullWidth*/}
                    {/*//                         name="city"*/}
                    {/*//                         label="City"*/}
                    {/*//                         id="city"*/}
                    {/*//                         value={city}*/}
                    {/*//                         onChange={event => onCityChange(event.target.value)}*/}
                    {/*//                         error={!isEmpty(errorMessage)} // TODO*/}
                    {/*//                     />*/}
                    {/*//                 </Grid>*/}
                    {/*//                 <Grid item xs={12} sm={6}>*/}
                    {/*//                     <TextField*/}
                    {/*//                         variant="outlined"*/}
                    {/*//                         required*/}
                    {/*//                         fullWidth*/}
                    {/*//                         name="phone"*/}
                    {/*//                         label="Phone"*/}
                    {/*//                         type="phone"*/}
                    {/*//                         id="phone"*/}
                    {/*//                         autoComplete="phone"*/}
                    {/*//                         value={phone || user.phone}*/}
                    {/*//                         onChange={event => onPhoneChange(event.target.value)}*/}
                    {/*//                         error={!isEmpty(errorMessage)} // TODO*/}
                    {/*//                     />*/}
                    {/*//                 </Grid>*/}
                    {/*//                 <Grid item xs={12} sm={6}>*/}
                    {/*//                     <FormControl variant="outlined" className={classes.formControl}>*/}
                    {/*//                         <InputLabel id="floor-select-outlined-label">Floor</InputLabel>*/}
                    {/*//                         <Select*/}
                    {/*//                             labelId="select-floor-label"*/}
                    {/*//                             id="floor-select"*/}
                    {/*//                             value={floor}*/}
                    {/*//                             onChange={event => onFloorChange(event.target.value)}*/}
                    {/*//                             error={!isEmpty(errorMessage)} // TODO*/}
                    {/*//                             label="Floor"*/}
                    {/*//                             autoWidth*/}
                    {/*//                         >*/}
                    {/*//                             {*/}
                    {/*//                                 FLOORS.map(f =>*/}
                    {/*//                                     <MenuItem value={f}>{f}</MenuItem>*/}
                    {/*//                                 )*/}
                    {/*//                             }*/}
                    {/*//                         </Select>*/}
                    {/*//                     </FormControl>*/}
                    {/*//                 </Grid>*/}
                    {/*//             </Grid>*/}
                    {/*//*/}
                    {/*{clientToken ? <div>*/}
                    {/*    <DropIn*/}
                    {/*        options={{authorization: clientToken}}*/}
                    {/*        onInstance={(instance) => (this.instance = instance)}*/}
                    {/*    />*/}
                    {/*</div> : <div>Loading</div>}*/}
                </form>
            </div>
        </Container>
    );
};

export default Payment;
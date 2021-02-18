import React, {useState, useEffect} from 'react'
import { makeStyles,Chip, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Container } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';


const useStyles = makeStyles(theme => (
    {
        paper: {
            width: 300,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }));

    export default function UserDisplay() {

        const [userData, setUserData] = useState([])

        async function fetchdata()
        {
            const data = await fetch('https://proxy-server-weatherapi.herokuapp.com/members') 
            const jsonData = await data.json()
            setUserData(jsonData)
        }

        useEffect(()=>{
            fetchdata()
        },[])
      
    const [singleUserData, setSingleUserData] = useState(null)
    const [currentID, setCurrentID] = useState(null)
    const [open, setOpen] = useState(false);
    const classes = useStyles();    
    
    //settng the date selected by user in calendar
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    

    //getting today's date and converting it to usable format
    const todayDate = new Date();
    const dateToday = `${todayDate.toLocaleString('default', { month: 'short' })} ${todayDate.getDate()} ${todayDate.getFullYear()}`
    const [dateToDisplay, setDateToDisplay] = useState(dateToday)

    const handleOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
       setOpen(false);
    }


    let arr = []
    function getOneUserData(idx,dateComp){
        setDateToDisplay(dateComp)
        const dateToCompare = dateComp
        arr = []
        userData.map(item => {
            if(item.id === idx){
                item.activity_periods.map((item,idx) => {

                    const dateTypeStart = new Date(item.start_time)
                    const typeDateStart = `${dateTypeStart.toLocaleString('default', { month: 'short' })} ${dateTypeStart.getDate()} ${dateTypeStart.getFullYear()}`
                    const dateTypeEnd = new Date(item.end_time)
                    
                    if(dateToCompare === typeDateStart){
                        let a = dateTypeStart.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/,"$1$3")
                        let b = dateTypeEnd.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/,"$1$3")
                        arr.push([a,b])
                    }
                    
                })
            }   
        })
        setSingleUserData([arr])
    }


    useEffect(()=> {
        if(singleUserData !== null)
        {
                handleOpen()
        }
    },[singleUserData])

    useEffect(()=>{
        
        if(selectedDate.getTime() === todayDate.getTime()){
            console.log('running')
        }
        else{
            const dateToSend = `${selectedDate.toLocaleString('default', { month: 'short' })} ${selectedDate.getDate()} ${selectedDate.getFullYear()}`;
            getOneUserData(currentID,dateToSend)
            
        }
    },[selectedDate])

    return (
    (userData.length === 0 ? null : 
    <div style={{width:"40%"}}>
        <TableContainer component = {Paper}>
            <Table aria-label = "simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"#3F51B5",fontSize:"17px"}}>Full Name</TableCell>
                        <TableCell style={{color:"#3F51B5",fontSize:"17px"}}>Place</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(userData)}
                    {
                        userData.map(row => (
                            <TableRow hover key={row.id} onClick = {()=> { setCurrentID(row.id); getOneUserData(row.id,dateToday)}}>
                                <TableCell>{row.real_name}</TableCell>
                                <TableCell><Chip label={row.tz} color="primary"/></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.alignItemsAndJustifyContent}
        >
            <div className={classes.paper} style={{padding:0,outline: 'none'}}>
                
                <Container style={{backgroundColor:"#3F51B5",fontFamily:"Roboto"}}>
                   <div style={{fontSize:"1rem",lineHeight:"1",fontWeight:"400",color:"rgba(255, 255, 255, 0.54)",paddingTop:"20px"}}>Activity Data</div>
                    <div style={{fontSize:"2.125rem",lineHeight:"2", fontWeight:"400",color:"white"}}>{dateToDisplay}</div>
                </Container>
                
                    {/* the calendar */}
                <Box ml={3} mr={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="pick date to view data"
                            format="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                    </MuiPickersUtilsProvider>
                </Box>
                
                
                <div id="simple-modal-description" style={{fontFamily:"Roboto"}} >   
                    {
                        ( singleUserData ? (singleUserData[0].length === 0 ? <Box style={{margin:24,color:"red"}}>No data available</Box> : 
                        <Box ml={3} mr={3} mb={3}>
                                <TableContainer>
                                    <Table className={classes.table} aria-label="login logout data">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Login</TableCell>
                                                <TableCell align="left">Logout</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            
                                        {singleUserData[0].map((item,idx) => (
                                            <TableRow>
                                                
                                                <TableCell align="left">{item[0]}</TableCell>
                                                <TableCell align="left">{item[1]}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ) : null )
                    }
                </div>
            </div>
        </Modal>
    </div>)
    )
}

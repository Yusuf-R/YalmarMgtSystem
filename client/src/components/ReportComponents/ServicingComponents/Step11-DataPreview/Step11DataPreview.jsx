import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

function Step11DataPreview({formData}) {
    const servicingDate = new Date(formData.servicingDate).toLocaleDateString();
    const cardSx = {
        alignContent: 'start',
        backgroundColor: 'inherit',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
        border: '2px solid #4db8ff',
    }
    // Split the summary into an array of sentences
    const summaryLines = formData.summary.split('\n');
    const warningMsg = [
        'Please ensure you have filled out all the required fields correctly before submitting.',
        'Document can not be edited after submission'
    ];
    return (
        <>
            <br/><br/>
            <Paper elevation={5} sx={{
                alignContent: 'start',
                padding: '30px',
                backgroundColor: 'inherit',
                color: '#46F0F9',
                borderRadius: '10px',
                width: '100%',
                height: 'auto',
                margin: '25px'
            }}>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'start',
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                }}>
                    <Typography variant='h5'>Data Preview</Typography>
                </Paper>
                <br/><br/>
                <Grid container spacing={2}>
                    {/* AllStaff Info */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Staff Information</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Full Name:</strong> {formData.fullName}</Typography>
                                <Typography variant="body1"><strong>Email:</strong> {formData.email}</Typography>
                                <Typography variant="body1"><strong>Role:</strong> {formData.role}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Admin Info */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Admin Information</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Full Name:</strong> {formData.adminFullName}
                                </Typography>
                                <Typography variant="body1"><strong>Email:</strong> {formData.adminEmail}</Typography>
                                <Typography variant="body1"><strong>Role:</strong> {formData.adminRole}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* AllSite Info */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Site Information</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Site ID:</strong> {formData.siteId}</Typography>
                                <Typography variant="body1"><strong>State:</strong> {formData.state}</Typography>
                                <Typography variant="body1"><strong>Cluster:</strong> {formData.cluster}</Typography>
                                <Typography variant="body1"><strong>Location:</strong> {formData.location}</Typography>
                                <Typography variant="body1"><strong>Site Type:</strong> {formData.siteType}</Typography>
                                <Typography variant="body1"><strong>Shelter Type:</strong> {formData.shelterType}
                                </Typography>
                                <Typography variant="body1"><strong>PM Instance:</strong> {formData.pmInstance}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Service Info */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Service Information</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Servicing Date:</strong> {servicingDate}
                                </Typography>
                                <Typography variant="body1"><strong>Next Service
                                    Date:</strong> {formData.nextServiceDate}
                                </Typography>
                                <Typography variant="body1"><strong>Site Gen Modes:</strong> {formData.siteGenModes}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Generator PM */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Generator PM</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Default
                                    Operation:</strong> {formData.generatorPM.defaultOperation}</Typography>
                                <Typography variant="body1"><strong>Gen1 Type:</strong> {formData.generatorPM.gen1Type}
                                </Typography>
                                <Typography variant="body1"><strong>Gen1
                                    Display:</strong> {formData.generatorPM.gen1Display}
                                </Typography>
                                <Typography variant="body1"><strong>Gen1 Hr:</strong> {formData.generatorPM.gen1Hr}
                                </Typography>
                                <Typography variant="body1"><strong>Custom Gen1
                                    Hr:</strong> {formData.generatorPM.customGen1Hr}
                                </Typography>
                                <Typography variant="body1"><strong>Gen1 Operating
                                    Voltage:</strong> {formData.generatorPM.gen1OperatingVoltage}</Typography>
                                <Typography variant="body1"><strong>Gen1 Operating
                                    Frequency:</strong> {formData.generatorPM.gen1OperatingFrequency}</Typography>
                                <Typography variant="body1"><strong>Gen1 Working
                                    Status:</strong> {formData.generatorPM.gen1WorkingStatus}</Typography>
                                <Typography variant="body1"><strong>Gen2 Type:</strong> {formData.generatorPM.gen2Type}
                                </Typography>
                                <Typography variant="body1"><strong>Gen2
                                    Display:</strong> {formData.generatorPM.gen2Display}
                                </Typography>
                                <Typography variant="body1"><strong>Gen2 Hr:</strong> {formData.generatorPM.gen2Hr}
                                </Typography>
                                <Typography variant="body1"><strong>Custom Gen2
                                    Hr:</strong> {formData.generatorPM.customGen2Hr}
                                </Typography>
                                <Typography variant="body1"><strong>Gen2 Operating
                                    Voltage:</strong> {formData.generatorPM.gen2OperatingVoltage}</Typography>
                                <Typography variant="body1"><strong>Gen2 Operating
                                    Frequency:</strong> {formData.generatorPM.gen2OperatingFrequency}</Typography>
                                <Typography variant="body1"><strong>Gen2 Working
                                    Status:</strong> {formData.generatorPM.gen2WorkingStatus}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Aircon PM */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Aircon PM</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>AC
                                    Installed:</strong> {formData.airconPM.acInstalled}
                                </Typography>
                                <Typography variant="body1"><strong>Number of AC
                                    Installed:</strong> {formData.airconPM.noOfACInstalled}</Typography>
                                <Typography variant="body1"><strong>AC1 Status:</strong> {formData.airconPM.ac1Status}
                                </Typography>
                                <Typography variant="body1"><strong>AC2 Status:</strong> {formData.airconPM.ac2Status}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Shelter PM */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Shelter PM</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Site Cleaning
                                    Status:</strong> {formData.shelterPM.siteCleaningStatus}</Typography>
                                <Typography variant="body1"><strong>Shelter Cleaning
                                    Status:</strong> {formData.shelterPM.shelterCleaningStatus}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Lightning PM */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Lightning PM</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>AWL:</strong> {formData.lightningPM.awl}
                                </Typography>
                                <Typography variant="body1"><strong>Security Light
                                    Availability:</strong> {formData.lightningPM.securityLightAvailability}</Typography>
                                <Typography variant="body1"><strong>Security Light
                                    Status:</strong> {formData.lightningPM.securityLightStatus}</Typography>
                                <Typography variant="body1"><strong>Flood Light
                                    Availability:</strong> {formData.lightningPM.floodLightAvailability}</Typography>
                                <Typography variant="body1"><strong>Flood Light
                                    Status:</strong> {formData.lightningPM.floodLightStatus}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* DC System */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>DC System</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Rectifier
                                    Status:</strong> {formData.dcSystem.rectifierStatus}</Typography>
                                <Typography variant="body1"><strong>Back Up
                                    Batteries:</strong> {formData.dcSystem.backUpBatteries}</Typography>
                                <Typography variant="body1"><strong>Number of
                                    Batteries:</strong> {formData.dcSystem.batteryCount}
                                </Typography>
                                <Typography variant="body1"><strong>Battery
                                    Status:</strong> {formData.dcSystem.batteryStatus}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Other PM */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Other PM</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Feeder Cable
                                    Status:</strong> {formData.otherPM.feederCableStatus}</Typography>
                                <Typography variant="body1"><strong>Change Over Switch
                                    Status:</strong> {formData.otherPM.changeOverSwitchStatus}</Typography>
                                <Typography variant="body1"><strong>Earthing Cable
                                    Status:</strong> {formData.otherPM.earthingCableStatus}
                                </Typography>
                                <Typography variant="body1"><strong>Earthing
                                    Status:</strong> {formData.otherPM.earthingStatus}
                                </Typography>
                                <Typography variant="body1"><strong>Fire Extinguisher
                                    Status:</strong> {formData.otherPM.fireExtinguisherStatus}
                                </Typography>
                                <Typography variant="body1"><strong>Earthing
                                    Status:</strong> {formData.otherPM.earthingStatus}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/*Security PM*/}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Security PM</Typography>
                                <Divider/>
                                <Typography variant="body1"><strong>Security
                                    Status:</strong> {formData.securityPM.securityStatus}</Typography>
                                <Typography variant="body1"><strong>Site
                                    Access:</strong> {formData.securityPM.siteAccess}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/*Summary*/}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Summary</Typography>
                                <Divider/>
                                {summaryLines.map((line, index) => (
                                    <List>
                                        <ListItem sx={{margin: 0, p: 0,}} key={index}>
                                            <ListItemIcon sx={{mr: -1}}>
                                                <PlaylistAddCheckIcon
                                                    sx={{color: "lime", fontSize: "32px"}}/>
                                            </ListItemIcon>
                                            <Typography sx={{
                                                fontWeight: 'bold',
                                                // color: 'white',
                                                fontFamily: 'Poppins',
                                                fontSize: '16px',
                                                m: -1,
                                            }}>
                                                {line}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Image List */}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Uploaded Images</Typography>
                                <Divider/>
                                <ImageList cols={3}>
                                    {formData.images.map((image, index) => (
                                        <ImageListItem key={index}>
                                            <img src={image.src} alt={`Uploaded image ${index + 1}`} loading="lazy"/>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/*Submission Warning*/}
                    <Grid item xs={12}>
                        <Card sx={cardSx}>
                            <CardContent>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    color: 'rgb(255, 128, 128)',
                                    fontFamily: 'Poppins',
                                    fontSize: '36px',
                                    m: -1,
                                }}>Submission Warning</Typography>
                                <Divider/>
                                {warningMsg.map((msg, index) => (
                                    <List>
                                        <ListItem sx={{margin: 0, p: 0,}} key={index}>
                                            <ListItemIcon sx={{mr: -1}}>
                                                <PlaylistAddCheckIcon
                                                    sx={{color: "lime", fontSize: "32px"}}/>
                                            </ListItemIcon>
                                            <Typography sx={{
                                                fontWeight: 'bold',
                                                color: 'white',
                                                fontFamily: 'Poppins',
                                                fontSize: '22px',
                                                m: -1,
                                            }}>
                                                {msg}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Step11DataPreview;

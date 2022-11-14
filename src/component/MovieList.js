import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { getMovieList } from "../apis";

export default function MovieList(props) {
    const [movieData, setMoviesData] = useState(null);

    useEffect(() => {
        async function defaultFunction() {
            let res = await getMovieList();
            if (res.status)
                setMoviesData(res?.data?.movies);
        }
        defaultFunction()
    }, [])

    return (
        <Container maxWidth="lg">
            <h1>List of Movies</h1>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    movieData
                        ?
                        movieData.map(function (dd, key) {
                            return (
                                <Grid item md={4}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardHeader
                                            title={dd.name}
                                            subheader={dd.release_date}
                                            action={
                                                <p>🌟{dd.ratings}</p>
                                            }
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={dd.image}
                                            alt={dd.name}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {dd.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                        :
                        "Loading"
                }

            </Grid>
        </Container>
    )
}